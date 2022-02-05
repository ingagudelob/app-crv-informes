package co.soymanantial.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import co.soymanantial.api.model.User;

public interface UserRepository extends MongoRepository<User, Integer>{

}
