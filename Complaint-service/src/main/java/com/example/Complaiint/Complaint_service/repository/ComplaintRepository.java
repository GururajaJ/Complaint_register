package com.example.Complaiint.Complaint_service.repository;

import com.example.Complaiint.Complaint_service.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    
    // Find complaints by user ID
    List<Complaint> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    // Find complaints by status
    List<Complaint> findByStatusOrderByCreatedAtDesc(String status);
    
    // Find complaints by category
    List<Complaint> findByCategoryOrderByCreatedAtDesc(String category);
    
    // Find complaints by priority
    List<Complaint> findByPriorityOrderByCreatedAtDesc(String priority);
    
    // Find complaints by user ID and status
    List<Complaint> findByUserIdAndStatusOrderByCreatedAtDesc(Long userId, String status);
    
    // Find complaints by user ID and category
    List<Complaint> findByUserIdAndCategoryOrderByCreatedAtDesc(Long userId, String category);
    
    // Search complaints by title or description
    @Query("SELECT c FROM Complaint c WHERE c.userId = :userId AND (LOWER(c.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Complaint> searchByUserIdAndText(@Param("userId") Long userId, @Param("searchTerm") String searchTerm);
    
    // Count complaints by status for a user
    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.userId = :userId AND c.status = :status")
    long countByUserIdAndStatus(@Param("userId") Long userId, @Param("status") String status);
    
    // Get all complaints ordered by creation date (for admin)
    List<Complaint> findAllByOrderByCreatedAtDesc();
} 