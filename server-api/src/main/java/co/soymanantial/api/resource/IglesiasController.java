package co.soymanantial.api.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.soymanantial.api.model.Iglesias;
import co.soymanantial.api.repository.IglesiasRepository;

@RestController
@CrossOrigin ("*")
@RequestMapping(value="/apiscrv/iglesias/")
public class IglesiasController {
	
	// Creo un objeto del tipo respositorio para trae los metodos
	
	@Autowired
	IglesiasRepository repositorio;

	// Metodo post para Iglesias
	@PostMapping("addIglesia")
	public String agregarIglesias (@RequestBody Iglesias iglesia) {
		repositorio.save(iglesia);
		return "Se ha agregado una iglesia exitosamente";
	}
	
	@GetMapping("listIglesias")
	public List<Iglesias> listarIglesias(){
		return repositorio.findAll();
	}
	
	@GetMapping("/deleteIglesia/{id}")
	public ResponseEntity<Iglesias> borrarIglesia(@PathVariable int id) {
		Optional<Iglesias> delIglesia = repositorio.findById(id);
		System.out.print(delIglesia);
		if (delIglesia.isPresent()) {
			repositorio.deleteById(id);
			
		}else {
			return new ResponseEntity<Iglesias>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Iglesias>(HttpStatus.OK);
		
	}

}
