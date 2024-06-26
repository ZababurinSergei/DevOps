#include "delay.h"
#include "functions.h"


void DELAY::init(){
		delay1 = new double[w_size * *parallel_size];
		delay2 = new double[w_size * *parallel_size];
		delay3 = new double[w_size * *parallel_size];
		set_0(delay1, w_size * *parallel_size);  // обнулим 1 раз
		set_0(delay2, w_size * *parallel_size);  // обнулим 1 раз
		set_0(delay3, w_size * *parallel_size);  // обнулим 1 раз
};


// функция задержки оригинального сигнала от memory_buffer
void DELAY::delay_original (double* in, int kuda, int skolko, int delay, int index, int i) 
{
		for (int q = 1 ; q <= skolko ; q++) {  // цикл сколько нужно волн хвоста
				if(i-q < 0)   // если интекс i уходит в отрицательную часть, переносим его в конец прошлого
						buff[i + w_size*(q-1+kuda)] = delay1[(w_size + (i - q)) + w_size*index];
				else   // если нет читаем как есть
						buff[i + w_size*(q-1+kuda)] = delay1[i-q+w_size*index];
		};
		delay1[i+w_size*index] = in[i];   //  старая память		
};

// функция создания хвоста в buff
void DELAY::delay_hvost (int skolko, int kuda, int otkuda, int index, int i) 
{
		for (int q = 1 ; q <= skolko ; q++) {  // цикл сколько нужно волн хвоста
				if(i-q < 0)   // если интекс i уходит в отрицательную часть, переносим его в конец прошлого
						buff[i + w_size*(q-1+kuda)] = delay2[(w_size + (i - q)) + w_size*index];
				else   // если нет читаем как есть
						buff[i + w_size*(q-1+kuda)] = delay2[i-q+w_size*index];
		};
		delay2[i+w_size*index] = buff[i + w_size*otkuda];   //  создание памяти
};

//  функия задерживает сигнал максимум на размер окна
void DELAY::delay_signal (int chto, int kuda,  int na_skolko, int index, int i){
		if(i < na_skolko){
				buff[i+kuda*w_size] = delay3[(w_size - na_skolko + i) + (w_size*index)];
		}	else if(i >= na_skolko) {
				buff[i+kuda*w_size] = delay3[(i - na_skolko) + (w_size*index)];
		};
		delay3[i + (w_size*index)] = buff[i+chto*w_size];  // память
};
