#ifndef __DELAY_H__
#define __DELAY_H__

class DELAY
{ 
public:
		int w_size; 
		int* parallel_size;
		double *buff;   

		double *delay1;   // память для задержки сигнала
		double *delay2;   // память для задержки сигнала
		double *delay3;   // память для задержки сигнала

		void init();

		// функция задержки оригинального сигнала от memory_buffer
		void delay_original (double* in, int kuda, int skolko, int delay, int index, int i);
		// функция создания хвоста в buff
		void delay_hvost (int skolko, int kuda, int otkuda, int index, int i);
		//  функия задерживает сигнал максимум на размер окна
		void delay_signal (int chto, int kuda,  int na_skolko, int index, int i);
};


#endif