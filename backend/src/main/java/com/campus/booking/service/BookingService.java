package com.campus.booking.service;

import com.campus.booking.dto.BookingRequest;
import com.campus.booking.dto.BookingResponse;
import com.campus.booking.entity.Booking;
import com.campus.booking.entity.Resource;
import com.campus.booking.entity.User;
import com.campus.booking.repository.BookingRepository;
import com.campus.booking.repository.ResourceRepository;
import com.campus.booking.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {
    
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;
    
    public BookingService(BookingRepository bookingRepository,
                         UserRepository userRepository,
                         ResourceRepository resourceRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.resourceRepository = resourceRepository;
    }
    
    public BookingResponse createBooking(BookingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (user.getStatus() != User.UserStatus.ACTIVE) {
            throw new RuntimeException("Only active users can book");
        }
        
        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() -> new RuntimeException("Resource not found"));
        
        if (resource.getStatus() != Resource.ResourceStatus.ACTIVE) {
            throw new RuntimeException("Resource is not available");
        }
        
        if (request.getBookingDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot book for past dates");
        }
        
        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new RuntimeException("End time must be after start time");
        }
        
        // Calculate booking duration in hours
        long durationMinutes = java.time.Duration.between(request.getStartTime(), request.getEndTime()).toMinutes();
        long durationHours = durationMinutes / 60;
        
        // Validate booking duration based on role
        if (user.getRole() == User.Role.STUDENT && durationHours > 1) {
            throw new RuntimeException("Students can only book for maximum 1 hour");
        }
        
        if (user.getRole() == User.Role.STAFF && durationHours > 3) {
            throw new RuntimeException("Staff can only book for maximum 3 hours");
        }
        
        // Check for overlapping bookings (any status except REJECTED)
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
                request.getResourceId(),
                request.getBookingDate(),
                request.getStartTime(),
                request.getEndTime()
        );
        
        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Slot already booked. Please check availability and choose another time.");
        }
        
        // Check daily booking limits
        long bookingsToday = bookingRepository.countUserBookingsForDate(user.getId(), request.getBookingDate());
        
        if (user.getRole() == User.Role.STUDENT && bookingsToday >= 2) {
            throw new RuntimeException("Students cannot book more than 2 slots per day");
        }
        
        if (user.getRole() == User.Role.STAFF && bookingsToday >= 4) {
            throw new RuntimeException("Staff cannot book more than 4 slots per day");
        }
        
        // Check weekly booking limits
        LocalDate startOfWeek = request.getBookingDate().with(java.time.DayOfWeek.MONDAY);
        LocalDate endOfWeek = startOfWeek.plusDays(6);
        
        long bookingsThisWeek = bookingRepository.countUserBookingsForDateRange(
                user.getId(), 
                startOfWeek, 
                endOfWeek
        );
        
        if (user.getRole() == User.Role.STUDENT && bookingsThisWeek >= 3) {
            throw new RuntimeException("You reached your limit for this week");
        }
        
        if (user.getRole() == User.Role.STAFF && bookingsThisWeek >= 5) {
            throw new RuntimeException("You reached your limit for this week");
        }
        
        Booking booking = new Booking();
        booking.setUserId(user.getId());
        booking.setResourceId(request.getResourceId());
        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setStatus(Booking.BookingStatus.PENDING);
        
        booking = bookingRepository.save(booking);
        
        return mapToResponse(booking);
    }
    
    public List<BookingResponse> getMyBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return bookingRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<BookingResponse> getPendingBookings() {
        return bookingRepository.findByStatus(Booking.BookingStatus.PENDING).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public BookingResponse approveBooking(UUID bookingId, String adminEmail) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus(Booking.BookingStatus.APPROVED);
        booking.setApprovedBy(admin.getId());
        
        booking = bookingRepository.save(booking);
        
        return mapToResponse(booking);
    }
    
    public BookingResponse rejectBooking(UUID bookingId, String reason, String adminEmail) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus(Booking.BookingStatus.REJECTED);
        booking.setRejectionReason(reason);
        booking.setApprovedBy(admin.getId());
        
        booking = bookingRepository.save(booking);
        
        return mapToResponse(booking);
    }
    
    public boolean checkAvailability(UUID resourceId, LocalDate date, LocalTime startTime, LocalTime endTime) {
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
                resourceId,
                date,
                startTime,
                endTime
        );
        return conflicts.isEmpty();
    }
    
    private BookingResponse mapToResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setUserId(booking.getUserId());
        response.setResourceId(booking.getResourceId());
        response.setBookingDate(booking.getBookingDate());
        response.setStartTime(booking.getStartTime());
        response.setEndTime(booking.getEndTime());
        response.setStatus(booking.getStatus().name());
        response.setRejectionReason(booking.getRejectionReason());
        response.setCreatedAt(booking.getCreatedAt());
        response.setApprovedBy(booking.getApprovedBy());
        
        userRepository.findById(booking.getUserId())
                .ifPresent(user -> response.setUserName(user.getName()));
        
        resourceRepository.findById(booking.getResourceId())
                .ifPresent(resource -> response.setResourceName(resource.getName()));
        
        return response;
    }
}
