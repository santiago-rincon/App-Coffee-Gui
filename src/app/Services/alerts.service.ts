import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}
  private logOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertSuccess('Sesión cerrada corectamente', 3000, 'Muy bien');
    });
  }

  alertError(mensage: string, time = 3000) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensage,
      showConfirmButton: false,
      timer: time,
    });
  }

  alertSuccess(
    mensage: string,
    time: number = 3000,
    title: string = 'Muy bien'
  ) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: mensage,
      showConfirmButton: false,
      timer: time,
    });
  }

  alertQuestion() {
    Swal.fire({
      title: '¿Quieres registrarte?',
      text: 'El correo no se encunetra registrado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009929',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Regristrarme',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/register']);
      }
    });
  }

  alertProfile(email: string | null, rol: string, name: string | null='Desconocido') {
    Swal.fire({
      title: 'Usuario actual',
      html: `<strong>Nombre: </strong>${name} <br><strong>Correo: </strong>${email} <br> <strong>Rol: </strong>${rol}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOut();
      }
    });
  }

  alertInfo(title: string, menssage: string) {
    Swal.fire({
      icon: 'info',
      title: title,
      text: menssage,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  alertImage(
    path: string,
    caption: string = 'no hay caption',
    title: string = ''
  ) {
    Swal.fire({
      text: caption,
      imageUrl: path,
      imageWidth: 1300,
      width: 5000,
      title: `<h1>${title}</h1>`,
      // imageHeight: 1000,
    });
  }
}
