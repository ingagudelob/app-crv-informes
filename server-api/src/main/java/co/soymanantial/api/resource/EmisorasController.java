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

import co.soymanantial.api.model.Emisoras;
import co.soymanantial.api.repository.EmisorasRepository;

@RestController
@CrossOrigin ("*")
@RequestMapping(value="/apiscrv/emisoras/")
public class EmisorasController {
	
	// Creo un objeto del tipo respositorio para trae los metodos
	
	@Autowired
	EmisorasRepository repositorio;

	// Metodo post para emisoras
	@PostMapping("addEmisora")
	public String agregarEmisora (@RequestBody Emisoras emisora) {
		repositorio.save(emisora);
		return "Se ha agregado una emisora exitosamente";
	}
	
	@GetMapping("listEmisoras")
	public List<Emisoras> listarEmisoras(){
		return repositorio.findAll();
	}
	
	@GetMapping("/deleteEmisora/{id}")
	public ResponseEntity<Emisoras> borrarEmisora(@PathVariable int id) {
		Optional<Emisoras> delEmisora = repositorio.findById(id);
		System.out.print(delEmisora);
		if (delEmisora.isPresent()) {
			repositorio.deleteById(id);
			
		}else {
			return new ResponseEntity<Emisoras>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Emisoras>(HttpStatus.OK);
		
	}

}
