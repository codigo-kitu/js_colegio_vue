import {Constantes} from './Constantes';

class FuncionGeneral {

	static GetUrlGlobalController(module:string | undefined,controller:string | undefined,action:string) {

		let sUrlGlobalController="";
		
		sUrlGlobalController=Constantes.STR_PROTOCOL+'://'+Constantes.STR_IP_SERVIDOR+':'+Constantes.STR_PUERTO_SERVIDOR+'/'+Constantes.STR_CONTEXTO_APLICACION+'/';
		
		sUrlGlobalController+=module + '/' + controller+ '/' + action;

		if(Constantes.IS_DEVELOPING===true) {
			console.log(sUrlGlobalController);
		}
		
		return sUrlGlobalController;
	}

	static GetRequestOptions(method:string,data_json:object) {
		
		const request_options = {

			method: method,

			headers: {
				'Content-Type':'application/json'	
			},
			
			body: JSON.stringify(data_json)
		};

		return request_options;
	}

	static GetLabelBoolean(value:string|boolean){
		let label="NO";

		if(value==true || value=="true") {
			label="SI";
		}

		return label;
	}

	static GetLabelDate(date:Date){
		let label="";
		//const date=new Date(value);

		const month=date.getMonth() + 1;
		const day=date.getDate();
		
		let smonth=month.toString();
		let sday=day.toString();

		if(month<10) {
			smonth = "0" + month.toString();
		}
		
		if(day<10) {
			sday = "0"+day.toString();
		}

		label=date.getFullYear() + "-"+ smonth + "-"+sday;

		return label;
	}

	static GetLabelTime(date:Date){
		let label="";
		//const date=new Date(value);

		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();

		let shour = hour.toString();
		let sminute = minute.toString();
		let ssecond = second.toString();

		if(hour<10) {
			shour = "0"+hour.toString();
		}

		if(minute<10) {
			sminute = "0"+ minute.toString();
		}

		if(second<10) {
			ssecond = "0"+second.toString();
		}

		label=shour + ":"+ sminute + ":"+ssecond;

		return label;
	}

	static GetLabelDateTime(date:Date){
		let label_final="";

		/*------------------ DATE --------------------- */
		//const date=new Date(value);

		const label_date = FuncionGeneral.GetLabelDate(date);

		/*-------------------------- TIME --------------------*/
		const label_time = FuncionGeneral.GetLabelTime(date);		

		label_final=label_date + " " +label_time;

		return label_final;
	}	

	static GetValueBoolean(value:string){
		let label=0;

		if(value == null) {
			//SI NO SE SELECCIONA NO ENVIA NADA
			label=0;

		} else if(value!= null && (value=="on" || value=="true" || value=="false")) {
			//SI SE SELECCIONA, ENVIA false (NO SE)
			label=1;
		}

		return label;
	}

	static mostrarTabActual(evt:Event, tab_name:string) {

		let i:number;

		//const tab_items:any;
		//let tab_buttons:any;
		//let tab_actual:any;

		const tab_items:HTMLCollection = document.getElementsByClassName("tab_item");

		for (i = 0; i < tab_items.length; i++) {
			(tab_items[i] as HTMLElement).style.display = "none";
		}

		const tab_buttons = document.getElementsByClassName("tab_button");
		
		for (i = 0; i < tab_buttons.length; i++) {
			tab_buttons[i].className = tab_buttons[i].className.replace(" active", "");
		}

		const tab_actual:HTMLElement | null = document.getElementById(tab_name) ;		
		
		if(tab_actual!=null) {
			tab_actual.style.display = "block";
		}

		(evt.currentTarget as HTMLElement).className += " active";
	}
}

const funcion_general1 = new FuncionGeneral();

export {FuncionGeneral,funcion_general1};