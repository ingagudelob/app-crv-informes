package co.soymanantial.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection="iglesias")

public class Iglesias {
	
	@Id
	private int id;
	private String nombreIglesia;
	private String pastorIglesia;
	private String ciudadIglesia;
	private String plantaElectrica;
	private String prefID = "IMVE";
	
	public String getPrefID() {
		return prefID;
	}
	public void setPrefID(String prefID) {
		this.prefID = prefID;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNombreIglesia() {
		return nombreIglesia;
	}
	public void setNombreIglesia(String nombreIglesia) {
		this.nombreIglesia = nombreIglesia;
	}
	public String getPastorIglesia() {
		return pastorIglesia;
	}
	public void setPastorIglesia(String pastorIglesia) {
		this.pastorIglesia = pastorIglesia;
	}
	public String getCiudadIglesia() {
		return ciudadIglesia;
	}
	public void setCiudadIglesia(String ciudadIglesia) {
		this.ciudadIglesia = ciudadIglesia;
	}
	public String getPlantaElectrica() {
		return plantaElectrica;
	}
	public void setPlantaElectrica(String plantaElectrica) {
		this.plantaElectrica = plantaElectrica;
	}
	
		
}
