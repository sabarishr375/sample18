package com.campus.booking.controller;

import com.campus.booking.dto.BookingRequest;
import com.campus.booking.dto.BookingResponse;
import com.campus.booking.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    
    private final BookingService bookingService;
    
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
    
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request,
                                                        Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(bookingService.createBooking(request, userEmail));
    }
    
    @GetMapping("/my")
    public ResponseEntity<List<BookingResponse>> getMyBookings(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(bookingService.getMyBookings(userEmail));
    }
    
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingResponse>> getPendingBookings() {
        return ResponseEntity.ok(bookingService.getPendingBookings());
    }
    
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingResponse> approveBooking(@PathVariable UUID id,
                                                         Authentication authentication) {
        String adminEmail = authentication.getName();
        return ResponseEntity.ok(bookingService.approveBooking(id, adminEmail));
    }
    
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingResponse> rejectBooking(@PathVariable UUID id,
                                                        @RequestBody Map<String, String> request,
                                                        Authentication authentication) {
        String adminEmail = authentication.getName();
        String reason = request.get("reason");
        return ResponseEntity.ok(bookingService.rejectBooking(id, reason, adminEmail));
    }
    
    @GetMapping("/check-availability")
    public ResponseEntity<Map<String, Object>> checkAvailability(
            @RequestParam UUID resourceId,
            @RequestParam String date,
            @RequestParam String startTime,
            @RequestParam String endTime) {
        boolean isAvailable = bookingService.checkAvailability(
                resourceId,
                java.time.LocalDate.parse(date),
                java.time.LocalTime.parse(startTime),
                java.time.LocalTime.parse(endTime)
        );
        return ResponseEntity.ok(Map.of("available", isAvailable));
    }
}
