package co.soymanantial.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection="emisoras")

public class Emisoras {
	
	@Id
	private int id;
	private String nombreEmisora;
	private String frecuenciaEmisora;
	private String potenciaEmisora;
	private String ciudadEmisora;
	private String txPrincipal;
	private String txAuxiliar;
	private String plantaElectrica;
	private boolean estudios;
	private String tipoEmisora;
	
	
	
	public String getFrecuenciaEmisora() {
		return frecuenciaEmisora;
	}
	public void setFrecuenciaEmisora(String frecuenciaEmisora) {
		this.frecuenciaEmisora = frecuenciaEmisora;
	}
	public String getTipoEmisora() {
		return tipoEmisora;
	}
	public void setTipoEmisora(String tipoEmisora) {
		this.tipoEmisora = tipoEmisora;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNombreEmisora() {
		return nombreEmisora;
	}
	public void setNombreEmisora(String nombreEmisora) {
		this.nombreEmisora = nombreEmisora;
	}
	public String getPotenciaEmisora() {
		return potenciaEmisora;
	}
	public void setPotenciaEmisora(String potenciaEmisora) {
		this.potenciaEmisora = potenciaEmisora;
	}
	public String getCiudadEmisora() {
		return ciudadEmisora;
	}
	public void setCiudadEmisora(String ciudadEmisora) {
		this.ciudadEmisora = ciudadEmisora;
	}
	public String getTxPrincipal() {
		return txPrincipal;
	}
	public void setTxPrincipal(String txPrincipal) {
		this.txPrincipal = txPrincipal;
	}
	public String getTxAuxiliar() {
		return txAuxiliar;
	}
	public void setTxAuxiliar(String txAuxiliar) {
		this.txAuxiliar = txAuxiliar;
	}
	public String getPlantaElectrica() {
		return plantaElectrica;
	}
	public void setPlantaElectrica(String plantaElectrica) {
		this.plantaElectrica = plantaElectrica;
	}
	public boolean isEstudios() {
		return estudios;
	}
	public void setEstudios(boolean estudios) {
		this.estudios = estudios;
	}
	
}
