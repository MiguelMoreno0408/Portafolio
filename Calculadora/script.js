class Calculadora {
    constructor(operacionAnteriorTexto, operacionActualTexto) {
        this.operacionAnteriorTexto = operacionAnteriorTexto
        this.operacionActualTexto = operacionActualTexto
        this.resetear()
        
    }

    resetear() {
        this.operacionActual = ''
        this.operacionAnterior = ''
        this.operacion = undefined
    }

    borrar() {
        this.operacionActual = this.operacionActual.toString().slice(0,-1)
    }

    introducirNumero(numero) {
        if( numero === '.' && this.operacionActual.includes('.')) return
        this.operacionActual = this.operacionActual.toString() + numero.toString()
    }

    elegirOperacion(operacion) {
        if(this.operacionActual === '') return
        if(this.operacionAnterior !== '') {
            this.computar()
        }
        this.operacion = operacion
        this.operacionAnterior = this.operacionActual
        this.operacionActual = ''
    }

    computar() {
        let computacion
        const anterior = parseFloat(this.operacionAnterior)
        const actual = parseFloat(this.operacionActual)
        if(isNaN(anterior || isNaN(actual))) return
        switch(this.operacion) {
            case '+': 
                computacion = anterior + actual
                break
            case '-': 
                computacion = anterior - actual
                break
            case '*': 
                computacion = anterior * actual
                break
            case '÷': 
                computacion = anterior / actual
                break
            default: 
                return
        }
        this.operacionActual = computacion
        this.operacion = undefined
        this.operacionAnterior = ''
    }

    obtenerNumeroPantalla(numero){
        const stringNumero = numero.toString()
        const integrarDigitos = parseFloat(stringNumero.split('.')[0])
        const digitosDecimales = stringNumero.split('.')[1]
        let integrarPantalla
            if (isNaN(integrarDigitos)) {
                integrarPantalla = ''
            } else {
                integrarPantalla = integrarDigitos.toLocaleString('en', { maximumFractionDigits: 0 })
            }
            if (digitosDecimales != null) {
                return `${integrarPantalla}.${digitosDecimales}`
            } else {
                return integrarPantalla
            }
    }
    
    actualizarPantalla(){
        this.operacionActualTexto.innerText = this.obtenerNumeroPantalla(this.operacionActual)
        if(this.operacion != null){
        this.operacionAnteriorTexto.innerText = 
            `${this.obtenerNumeroPantalla(this.operacionAnterior)} ${this.operacion}`
        } else { this.operacionAnteriorTexto.innerText = '' }
    }
    
    }


const botonesNumero = document.querySelectorAll('[numero-boton]')
const botonesOperacion = document.querySelectorAll('[simbolo-operacion]')
const botonIgual = document.querySelector('[boton-igual]')
const botonResetear = document.querySelector('[boton-resetear]')
const botonBorrar = document.querySelector('[boton-borrar]')
const operacionAnteriorTexto = document.querySelector('[operacion-anterior-texto]')
const operacionActualTexto = document.querySelector('[operacion-actual-texto]')


const calculadora = new Calculadora(operacionAnteriorTexto, operacionActualTexto)

botonesNumero.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.introducirNumero(button.innerText)
        calculadora.actualizarPantalla()
    })
})

botonesOperacion.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.elegirOperacion(button.innerText)
        calculadora.actualizarPantalla()
    })
})

botonIgual.addEventListener('click', button => {
    calculadora.computar()
    calculadora.actualizarPantalla()
})

botonResetear.addEventListener('click', button => {
    calculadora.resetear()
    calculadora.actualizarPantalla()
})

botonBorrar.addEventListener('click', button => {
    calculadora.borrar()
    calculadora.actualizarPantalla()
})