package co.soymanantial.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import co.soymanantial.api.model.Emisoras;

public interface EmisorasRepository extends MongoRepository<Emisoras, Integer> {

}
