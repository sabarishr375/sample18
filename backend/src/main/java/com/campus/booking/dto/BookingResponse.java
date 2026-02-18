package com.campus.booking.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class BookingResponse {
    private UUID id;
    private UUID userId;
    private String userName;
    private UUID resourceId;
    private String resourceName;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;
    private String rejectionReason;
    private LocalDateTime createdAt;
    private UUID approvedBy;
}
