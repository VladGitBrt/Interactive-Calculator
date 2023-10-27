import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

enum CalculatorAction {
  Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/'
}

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  public mode: 'runtime' | 'constructor' = 'constructor';

  calculatingProcess = {
    num1: '',
    action: '',
    num2: '',
    result: '',
    isSecondNumber: false
  };

  components = ['display', 'actions', 'numbers', 'equals'];
  canvas = [''];

  ngOnInit(): void {
    console.log(parseFloat('56'.replace(',','.')))
  }

  removeFromCanvas(name: string){
    if(this.canvas.includes(name)) {
      const index = this.canvas.indexOf(name);
      this.canvas.splice(index, 1);
      this.components.push(name);
    } 
  }
  

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    let isDisplayOnCanvas = this.canvas.includes('display');
    if(isDisplayOnCanvas) {   
      if(this.canvas.indexOf('display') !== 0){
        console.log('canvas is not on the first pos');
        const index = this.canvas.indexOf('display');
        this.canvas.splice(index, 1);
        this.components.push('display')
        alert('Display should be on the top')
      }
    }
    console.log(this.components, this.canvas, isDisplayOnCanvas)
  }

  setRuntime(){
    this.mode = 'runtime';
    this.calculatingProcess = {
      num1: '',
      num2: '',
      action: '',
      result: '',
      isSecondNumber: false
    }
  }

  setConstructor(){
    this.mode = 'constructor';
    this.calculatingProcess = {
      num1: '',
      num2: '',
      action: '',
      result: '',
      isSecondNumber: false
    }
  }
  
  action(action: any){
    if(this.mode === 'runtime' && this.canvas.includes('display')){
      if(this.calculatingProcess.isSecondNumber){
        this.calculatingProcess.num2 += action.innerText;
      }  
      else {
        this.calculatingProcess.num1 += action.innerText;
        this.calculatingProcess.num1 = this.calculatingProcess.num1.slice(0,10)
      }
      console.log(this.calculatingProcess)
    }
  }

  add(){
    this.calculatingProcess.action = CalculatorAction.Add;
    this.calculatingProcess.isSecondNumber = true;
    console.log(this.calculatingProcess)
  }

  subst(){
    this.calculatingProcess.action = CalculatorAction.Subtract;
    this.calculatingProcess.isSecondNumber = true;
    console.log(this.calculatingProcess)
  }

  divide(){
    this.calculatingProcess.action = CalculatorAction.Divide;
    this.calculatingProcess.isSecondNumber = true;
    console.log(this.calculatingProcess)
  }

  mult(){
    this.calculatingProcess.action = CalculatorAction.Multiply;
    this.calculatingProcess.isSecondNumber = true;
    console.log(this.calculatingProcess)
  }

  equal() {
    if(this.calculatingProcess.num1 && this.calculatingProcess.num2 && this.calculatingProcess.action){
      switch(this.calculatingProcess.action){
        case CalculatorAction.Add:
          this.calculatingProcess.result = (parseFloat(this.calculatingProcess.num1.replace(',','.'))  + parseFloat(this.calculatingProcess.num2.replace(',','.'))).toString().replace('.',',').slice(0,10)
          this.calculatingProcess.num1 = '';
          this.calculatingProcess.num2 = '';
          this.calculatingProcess.action = '';
          this.calculatingProcess.isSecondNumber = false;
          console.log(this.calculatingProcess)
          break;
        case CalculatorAction.Subtract:
          this.calculatingProcess.result = (parseFloat(this.calculatingProcess.num1.replace(',','.'))  - parseFloat(this.calculatingProcess.num2.replace(',','.'))).toString().replace('.',',').slice(0,10);
          this.calculatingProcess.num1 = '';
          this.calculatingProcess.num2 = '';
          this.calculatingProcess.action = '';
          this.calculatingProcess.isSecondNumber = false;
          console.log(this.calculatingProcess)
          break;
        case CalculatorAction.Multiply:
          this.calculatingProcess.result = (parseFloat(this.calculatingProcess.num1.replace(',','.'))  * parseFloat(this.calculatingProcess.num2.replace(',','.'))).toString().replace('.',',').slice(0,10);
          this.calculatingProcess.num1 = '';
          this.calculatingProcess.num2 = '';
          this.calculatingProcess.action = '';
          this.calculatingProcess.isSecondNumber = false;
          console.log(this.calculatingProcess)
          break;
        case CalculatorAction.Divide:
          if(this.calculatingProcess.num2 === '0'){
            this.calculatingProcess.result = 'Undefined'
            this.calculatingProcess.num1 = '';
            this.calculatingProcess.num2 = '';
            this.calculatingProcess.action = '';
            this.calculatingProcess.isSecondNumber = false;
            console.log('undefined')
          } else {
          this.calculatingProcess.result = (parseFloat(this.calculatingProcess.num1.replace(',','.'))  / parseFloat(this.calculatingProcess.num2.replace(',','.'))).toString().replace('.',',').slice(0,10);
          this.calculatingProcess.num1 = '';
          this.calculatingProcess.num2 = '';
          this.calculatingProcess.action = '';
          this.calculatingProcess.isSecondNumber = false;
          console.log(this.calculatingProcess)
          break;
        }
      }
    }
  }
}
