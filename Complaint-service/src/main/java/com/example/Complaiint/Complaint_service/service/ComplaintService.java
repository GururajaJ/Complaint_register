package com.example.Complaiint.Complaint_service.service;

import com.example.Complaiint.Complaint_service.entity.Complaint;
import com.example.Complaiint.Complaint_service.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {
    
    @Autowired
    private ComplaintRepository complaintRepository;
    
    // Create a new complaint
    public Complaint createComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }
    
    // Get all complaints (for admin)
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAllByOrderByCreatedAtDesc();
    }
    
    // Get complaints by user ID
    public List<Complaint> getComplaintsByUserId(Long userId) {
        return complaintRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    // Get complaint by ID
    public Optional<Complaint> getComplaintById(Long id) {
        return complaintRepository.findById(id);
    }
    
    // Update complaint status
    public Complaint updateComplaintStatus(Long id, String status) {
        Optional<Complaint> complaintOpt = complaintRepository.findById(id);
        if (complaintOpt.isPresent()) {
            Complaint complaint = complaintOpt.get();
            complaint.setStatus(status);
            return complaintRepository.save(complaint);
        }
        throw new RuntimeException("Complaint not found with id: " + id);
    }
    
    // Update complaint
    public Complaint updateComplaint(Long id, Complaint updatedComplaint) {
        Optional<Complaint> complaintOpt = complaintRepository.findById(id);
        if (complaintOpt.isPresent()) {
            Complaint existingComplaint = complaintOpt.get();
            
            // Update fields
            existingComplaint.setTitle(updatedComplaint.getTitle());
            existingComplaint.setDescription(updatedComplaint.getDescription());
            existingComplaint.setCategory(updatedComplaint.getCategory());
            existingComplaint.setPriority(updatedComplaint.getPriority());
            existingComplaint.setStatus(updatedComplaint.getStatus());
            existingComplaint.setLocation(updatedComplaint.getLocation());
            existingComplaint.setPhotos(updatedComplaint.getPhotos());
            
            return complaintRepository.save(existingComplaint);
        }
        throw new RuntimeException("Complaint not found with id: " + id);
    }
    
    // Delete complaint
    public void deleteComplaint(Long id) {
        complaintRepository.deleteById(id);
    }
    
    // Get complaints by status
    public List<Complaint> getComplaintsByStatus(String status) {
        return complaintRepository.findByStatusOrderByCreatedAtDesc(status);
    }
    
    // Get complaints by category
    public List<Complaint> getComplaintsByCategory(String category) {
        return complaintRepository.findByCategoryOrderByCreatedAtDesc(category);
    }
    
    // Get complaints by priority
    public List<Complaint> getComplaintsByPriority(String priority) {
        return complaintRepository.findByPriorityOrderByCreatedAtDesc(priority);
    }
    
    // Get complaints by user ID and status
    public List<Complaint> getComplaintsByUserIdAndStatus(Long userId, String status) {
        return complaintRepository.findByUserIdAndStatusOrderByCreatedAtDesc(userId, status);
    }
    
    // Search complaints by text for a specific user
    public List<Complaint> searchComplaintsByUserIdAndText(Long userId, String searchTerm) {
        return complaintRepository.searchByUserIdAndText(userId, searchTerm);
    }
    
    // Get complaint statistics for a user
    public long getComplaintCountByUserIdAndStatus(Long userId, String status) {
        return complaintRepository.countByUserIdAndStatus(userId, status);
    }
    
    // Get all complaints for admin with filtering
    public List<Complaint> getComplaintsForAdmin(String status, String category, String priority) {
        List<Complaint> allComplaints = complaintRepository.findAllByOrderByCreatedAtDesc();
        
        if (status != null && !status.isEmpty()) {
            allComplaints = allComplaints.stream()
                .filter(c -> c.getStatus().equals(status))
                .toList();
        }
        
        if (category != null && !category.isEmpty()) {
            allComplaints = allComplaints.stream()
                .filter(c -> c.getCategory().equals(category))
                .toList();
        }
        
        if (priority != null && !priority.isEmpty()) {
            allComplaints = allComplaints.stream()
                .filter(c -> c.getPriority().equals(priority))
                .toList();
        }
        
        return allComplaints;
    }
} 