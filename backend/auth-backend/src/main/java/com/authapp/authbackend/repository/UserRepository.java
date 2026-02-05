package com.authapp.authbackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.authapp.authbackend.model.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

}
