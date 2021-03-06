import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutService {

  constructor() { }

  rutFormat(value: string): string {
    const rut: string = this.rutClean(value);
    if (rut.length <= 1) {
      return;
    }

    let result = `${rut.slice(-4, -1)}-${rut.substr(rut.length - 1)}`;
    for (let i = 4; i < rut.length; i += 3) {
      result = `${rut.slice(-3 - i, -i)}.${result}`;
    }

    return result;
  }

  rutClean(value: string): string {
    return typeof value === 'string' ? value.replace(/[^0-9kK]+/g, '').toUpperCase() : '';
  }
  
  validaRUT(rut: string): boolean {
    let valor: string = rut;
    valor = this.rutClean(valor);
  
    // Aislar Cuerpo y Dígito Verificador
    const cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
  
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7 && cuerpo.length >= 0) {
      return true;
    }
  
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;
  
    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      const index = multiplo * Number(valor.charAt(cuerpo.length - i));
  
      // Sumar al Contador General
      suma = suma + index;
  
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }
  
    // Calcular Dígito Verificador en base al Módulo 11
    const dvEsperado = 11 - (suma % 11);
  
    // Casos Especiales (0 y K)
    dv = dv === 'K' ? '10' : dv;
    dv = dv === '0' ? '11' : dv;
  
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado.toString() !== dv && cuerpo.length >= 0) {
      return true;
    } else {
      return false;
    }

  }

  getRutChile(mode: number ,rut: string): string | boolean {

    if(!this.validaRUT(rut)) {
      switch (mode) {
        // el rut limpio 184215551
        case 0:
          return this.rutClean(rut);
        // solo el cuerpo del rut  18421555
        case 1:
          let valor: string = rut;
          valor = this.rutClean(valor);
          let cuerpo = valor.slice(0, -1);
          return cuerpo;
        // rut formateado 18.421.555-1
        case 2:
          return this.rutFormat(rut);
        // rut cuerpo - digitov : 18421555-1  
        case 3:
            let r: string = rut;
            r = this.rutClean(r);
            const c = r.slice(0, -1);
            let dv = r.slice(-1).toUpperCase();
            return c + '-'+ dv;
        case 4:
          let ru: string = rut;
          ru = this.rutClean(ru);
          let div = ru.slice(-1).toUpperCase();
          return div; 
      }
    } else {
      return false;
    }
      
  }

}
