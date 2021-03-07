import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    this.showMessage(this.getMessageIMC(imc));
  }

  getMessageIMC(imc: number) {

    let msg = {
      text: '',
      color: ''
    };

    if (imc < 18.5) {

      msg.text = 'Magreza';
      msg.color = 'warning';

    } else if (imc < 25.0) {

      msg.text = 'Normal';
      msg.color = 'success';

    } else if (imc < 30.0) {

      msg.text = 'Sobrepeso';
      msg.color = 'warning';

    } else if (imc < 40.0) {
      
      msg.text = 'Obesidade';
      msg.color = 'danger';

    } else  {

      msg.text = 'Obesidade Grave';
      msg.color = 'danger'

    }

    return msg;

  }

  async showMessage(msg) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg.text,
        color: msg.color,
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
