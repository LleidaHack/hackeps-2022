import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  translateMessage(code: string) {
    // Mail SignIn
    if(code === "auth/invalid-email") {
      return "Correo inválido";
    } if(code === "auth/user-disabled") {
      return "Usuario incapacitado";
    } if(code === "auth/user-not-found") {
      return "No existe ningún usuario registrado con este correo";
    } if(code === "auth/wrong-password") {
      return "Contraseña incorrecta";
    } 
    // Mail SignUp
    if(code === "auth/email-already-in-use") {
      return "El correo introducido ya está registrado";
    } if(code === "auth/invalid-email") {
      return "Correo inválido";
    } if(code === "auth/user-disabled") {
      return "Usuario incapacitado";
    } if(code === "auth/operation-not-allowed") {
      return "Operación no permitida";
    } if(code === "auth/operation-not-allowed") {
      return "Operación no permitida";
    } if(code === "auth/weak-password") {
      return "Contraseña débil";
    }
    // Otros
    else {
      return "Ha ocurrido un error";
    }
  }
}
