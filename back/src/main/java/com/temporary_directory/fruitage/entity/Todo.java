package com.temporary_directory.fruitage.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="todo_id")
    private int todoId;

    @Column(name="todo_date")
    private LocalDate todoDate;

    @Column(name="todo_content")
    private String todoContent;

    @Column(name="todo_complete", columnDefinition = "TINYINT(1)")
    private boolean todoComplete;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    private Category category;

    public void updateTodoComplete() {
        if(this.todoComplete == true){
            this.todoComplete=false;
        }else{
            this.todoComplete=true;
        }
    }

    public void updateTodo(LocalDate date, String content, Category category){
        this.todoDate=date;
        this.todoContent=content;
        this.category=category;
    }
}
