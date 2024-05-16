package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.entity.User;

public interface CalendarService {
    void setCategory(User user, String categoryName, String categoryColor);
}
