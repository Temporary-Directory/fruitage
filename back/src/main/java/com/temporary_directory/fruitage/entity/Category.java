package com.temporary_directory.fruitage.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="category_id")
    private int categoryId;

    @Column(name="category_name")
    private String categoryName;

    @Column(name="category_color")
    private String categoryColor;

    @Column(name="category_is_deleted", columnDefinition = "TINYINT(1)")
    private boolean categoryIsDeleted;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    public void deleteCategory(){
        this.categoryIsDeleted=true;
    }
    public void updateCategory(String categoryName, String categoryColor) {
        this.categoryName=categoryName;
        this.categoryColor=categoryColor;
    }
}
