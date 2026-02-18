package com.campus.booking.repository;

import com.campus.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByUserId(UUID userId);
    
    List<Booking> findByStatus(Booking.BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.resourceId = :resourceId " +
           "AND b.bookingDate = :date AND b.status = 'APPROVED' " +
           "AND ((b.startTime < :endTime AND b.endTime > :startTime))")
    List<Booking> findConflictingBookings(UUID resourceId, LocalDate date, 
                                          LocalTime startTime, LocalTime endTime);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.userId = :userId " +
           "AND b.bookingDate = :date AND b.status IN ('PENDING', 'APPROVED')")
    long countUserBookingsForDate(UUID userId, LocalDate date);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.userId = :userId " +
           "AND b.bookingDate BETWEEN :startDate AND :endDate " +
           "AND b.status IN ('PENDING', 'APPROVED')")
    long countUserBookingsForDateRange(UUID userId, LocalDate startDate, LocalDate endDate);
}
