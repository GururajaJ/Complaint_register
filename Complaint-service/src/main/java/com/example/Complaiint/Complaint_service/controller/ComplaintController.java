package com.example.Complaiint.Complaint_service.controller;

import com.example.Complaiint.Complaint_service.entity.Complaint;
import com.example.Complaiint.Complaint_service.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {
    
    @Autowired
    private ComplaintService complaintService;
    
    // Create a new complaint
    @PostMapping
    public ResponseEntity<?> createComplaint(@Valid @RequestBody Complaint complaint) {
        try {
            Complaint savedComplaint = complaintService.createComplaint(complaint);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Complaint created successfully");
            response.put("complaint", savedComplaint);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Get all complaints (for admin)
    @GetMapping
    public ResponseEntity<?> getAllComplaints(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String priority) {
        try {
            List<Complaint> complaints;
            if (status != null || category != null || priority != null) {
                complaints = complaintService.getComplaintsForAdmin(status, category, priority);
            } else {
                complaints = complaintService.getAllComplaints();
            }
            return ResponseEntity.ok(complaints);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Get complaints by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getComplaintsByUserId(@PathVariable Long userId) {
        try {
            List<Complaint> complaints = complaintService.getComplaintsByUserId(userId);
            return ResponseEntity.ok(complaints);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Get complaint by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getComplaintById(@PathVariable Long id) {
        try {
            Optional<Complaint> complaint = complaintService.getComplaintById(id);
            if (complaint.isPresent()) {
                return ResponseEntity.ok(complaint.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Update complaint status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateComplaintStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            if (status == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Status is required"));
            }
            
            Complaint updatedComplaint = complaintService.updateComplaintStatus(id, status);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Complaint status updated successfully");
            response.put("complaint", updatedComplaint);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Update complaint
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComplaint(
            @PathVariable Long id,
            @Valid @RequestBody Complaint updatedComplaint) {
        try {
            Complaint complaint = complaintService.updateComplaint(id, updatedComplaint);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Complaint updated successfully");
            response.put("complaint", complaint);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Delete complaint
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComplaint(@PathVariable Long id) {
        try {
            complaintService.deleteComplaint(id);
            return ResponseEntity.ok(Map.of("message", "Complaint deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Get complaints by status
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getComplaintsByStatus(@PathVariable String status) {
        try {
            List<Complaint> complaints = complaintService.getComplaintsByStatus(status);
            return ResponseEntity.ok(complaints);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Get complaints by category
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getComplaintsByCategory(@PathVariable String category) {
        try {
            List<Complaint> complaints = complaintService.getComplaintsByCategory(category);
            return ResponseEntity.ok(complaints);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Get complaints by priority
    @GetMapping("/priority/{priority}")
    public ResponseEntity<?> getComplaintsByPriority(@PathVariable String priority) {
        try {
            List<Complaint> complaints = complaintService.getComplaintsByPriority(priority);
            return ResponseEntity.ok(complaints);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Search complaints by text for a specific user
    @GetMapping("/user/{userId}/search")
    public ResponseEntity<?> searchComplaintsByUserIdAndText(
            @PathVariable Long userId,
            @RequestParam String searchTerm) {
        try {
            List<Complaint> complaints = complaintService.searchComplaintsByUserIdAndText(userId, searchTerm);
            return ResponseEntity.ok(complaints);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Get complaint statistics for a user
    @GetMapping("/user/{userId}/stats")
    public ResponseEntity<?> getComplaintStatsByUserId(@PathVariable Long userId) {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("pending", complaintService.getComplaintCountByUserIdAndStatus(userId, "pending"));
            stats.put("in_progress", complaintService.getComplaintCountByUserIdAndStatus(userId, "in_progress"));
            stats.put("resolved", complaintService.getComplaintCountByUserIdAndStatus(userId, "resolved"));
            stats.put("total", complaintService.getComplaintsByUserId(userId).size());
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 