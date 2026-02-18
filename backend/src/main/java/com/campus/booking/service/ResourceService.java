package com.campus.booking.service;

import com.campus.booking.entity.Resource;
import com.campus.booking.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {
    
    private final ResourceRepository resourceRepository;
    
    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }
    
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }
    
    public Resource createResource(Resource resource) {
        return resourceRepository.save(resource);
    }
}
