package com.campus.booking.config;

import com.campus.booking.entity.Resource;
import com.campus.booking.entity.User;
import com.campus.booking.repository.ResourceRepository;
import com.campus.booking.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public DataInitializer(ResourceRepository resourceRepository,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void run(String... args) {
        initializeResources();
        initializeUsers();
    }
    
    private void initializeResources() {
        if (resourceRepository.count() > 0) {
            return;
        }
        
        List<Resource> resources = new ArrayList<>();
        
        String[] labs = {
            "Lab 1 – AI Lab",
            "Lab 2 – ML Lab",
            "Lab 3 – IoT Lab",
            "Lab 4 – Cloud Lab",
            "Lab 5 – Cyber Security Lab",
            "Lab 6 – Data Science Lab",
            "Lab 7 – Robotics Lab",
            "Lab 8 – Networking Lab"
        };
        
        for (String lab : labs) {
            Resource resource = new Resource();
            resource.setName(lab);
            resource.setType(Resource.ResourceType.LAB);
            resource.setCapacity(30);
            resource.setStatus(Resource.ResourceStatus.ACTIVE);
            resources.add(resource);
        }
        
        String[] halls = {
            "Hall 1 – Main Auditorium",
            "Hall 2 – Seminar Hall A",
            "Hall 3 – Seminar Hall B",
            "Hall 4 – Conference Hall"
        };
        
        for (String hall : halls) {
            Resource resource = new Resource();
            resource.setName(hall);
            resource.setType(Resource.ResourceType.EVENT_HALL);
            resource.setCapacity(100);
            resource.setStatus(Resource.ResourceStatus.ACTIVE);
            resources.add(resource);
        }
        
        String[] classrooms = {
            "SCR 1 – Smart Room A",
            "SCR 2 – Smart Room B",
            "SCR 3 – Smart Room C",
            "SCR 4 – Smart Room D",
            "SCR 5 – Smart Room E",
            "SCR 6 – Smart Room F",
            "SCR 7 – Smart Room G",
            "SCR 8 – Smart Room H",
            "SCR 9 – Smart Room I",
            "SCR 10 – Smart Room J"
        };
        
        for (String classroom : classrooms) {
            Resource resource = new Resource();
            resource.setName(classroom);
            resource.setType(Resource.ResourceType.SMART_CLASSROOM);
            resource.setCapacity(40);
            resource.setStatus(Resource.ResourceStatus.ACTIVE);
            resources.add(resource);
        }
        
        resourceRepository.saveAll(resources);
        System.out.println("Initialized " + resources.size() + " resources");
    }
    
    private void initializeUsers() {
        // Check if users already exist
        if (userRepository.count() > 0) {
            return;
        }
        
        List<User> users = new ArrayList<>();
        
        // 1 Admin
        User admin = new User();
        admin.setName("Admin");
        admin.setEmail("admin@ksrce.ac.in");
        admin.setPassword(passwordEncoder.encode("Admin@123"));
        admin.setPhone("9876543210");
        admin.setRole(User.Role.ADMIN);
        admin.setStatus(User.UserStatus.ACTIVE);
        users.add(admin);
        
        // 10 Students
        String[] studentNames = {
            "Raj", "Suraj", "Abi", "Ram", "Priya", 
            "Karthik", "Divya", "Arun", "Sneha", "Vijay"
        };
        
        for (int i = 0; i < studentNames.length; i++) {
            User student = new User();
            student.setName(studentNames[i]);
            student.setEmail(studentNames[i].toLowerCase() + "@ksrce.ac.in");
            student.setPassword(passwordEncoder.encode("Student@123"));
            student.setPhone("98765432" + (10 + i));
            student.setRole(User.Role.STUDENT);
            student.setStatus(User.UserStatus.ACTIVE);
            users.add(student);
        }
        
        // 6 Staff
        String[] staffNames = {
            "Dr.Kumar", "Prof.Lakshmi", "Dr.Ravi", 
            "Prof.Meena", "Dr.Ganesh", "Prof.Saranya"
        };
        
        for (int i = 0; i < staffNames.length; i++) {
            User staff = new User();
            staff.setName(staffNames[i]);
            staff.setEmail(staffNames[i].toLowerCase().replace(".", "") + "@ksrce.ac.in");
            staff.setPassword(passwordEncoder.encode("Staff@123"));
            staff.setPhone("98765433" + (10 + i));
            staff.setRole(User.Role.STAFF);
            staff.setStatus(User.UserStatus.ACTIVE);
            users.add(staff);
        }
        
        userRepository.saveAll(users);
        
        System.out.println("=".repeat(60));
        System.out.println("INITIALIZED SAMPLE USERS");
        System.out.println("=".repeat(60));
        System.out.println("\nADMIN (1):");
        System.out.println("  Email: admin@ksrce.ac.in | Password: Admin@123");
        
        System.out.println("\nSTUDENTS (10):");
        for (String name : studentNames) {
            System.out.println("  Email: " + name.toLowerCase() + "@ksrce.ac.in | Password: Student@123");
        }
        
        System.out.println("\nSTAFF (6):");
        for (String name : staffNames) {
            System.out.println("  Email: " + name.toLowerCase().replace(".", "") + "@ksrce.ac.in | Password: Staff@123");
        }
        System.out.println("=".repeat(60));
    }
}
