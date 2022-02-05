package co.soymanantial.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import co.soymanantial.api.model.Iglesias;

public interface IglesiasRepository extends MongoRepository<Iglesias, Integer> {

}
