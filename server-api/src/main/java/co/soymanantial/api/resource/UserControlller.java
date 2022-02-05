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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import co.soymanantial.api.model.User;
import co.soymanantial.api.repository.UserRepository;

@RestController
@CrossOrigin(origins="*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE})
//@CrossOrigin("*")
@RequestMapping(value="/apiscrv/user/")
public class UserControlller {
	
	@Autowired
	UserRepository repositorio;
	
	@PostMapping("addUser")
	 public String addUser(@RequestBody User usuario) {
		 repositorio.save(usuario);
		 return "Se ha creado un Usuario exitosamente";
	 }
	
	@GetMapping ("listUser")
	public List<User> listUser(){
		return repositorio.findAll();
	}
	
	@GetMapping("/deleteUser/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable int id) {
		Optional<User> delUser = repositorio.findById(id);
		System.out.print(delUser);
		if (delUser.isPresent()) {
			repositorio.deleteById(id);
			
		}else {
			return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<User>(HttpStatus.OK);
		
	}
	
}
