#ifndef __LINE_FUNCTION_H__
#define __LINE_FUNCTION_H__
/*
0 - квадрат от оригинала (от 1 из 0 1 2)
1,2,3 - задерженный сигнал
4 - квадрат от задерженного (от 2 из 1 2 3)
5 - квадрат по максимальным пикам
6,7,8    9,10,11 - линии максимального уровня, будущее, настроящее, прошлое (парами 6 7 8  9 10 11)
12,13 - линии  от первого сэмпла и последнего в квадрате
14,15,16,17  линии от пре пика сэмпла и после пикого значения  собранно парами нечет чёт 
18 19 20 21   22 23 24 25  Диагональ (4 без краёв, 4 с краями)
*/
#include "delay.h"
#include "kosie.h"


class LINE_FUNCTION
{
public: 
		//Глобальные
		int w_size; 
		double* buff;
		int otkuda;
		int kuda;

		//__________________БЕЗ ЗАДЕРЖКИ
		//оригинал 3 сигнала
		double old_s0;
		double old_s1;
		double old_s2;
		
		//квадрат 0
		double old_0;
		//сбор информации о квадрате 0
		int count_sample_0;
		int count_0;
		double *square_info_0;
						//  [номер квадрата][0][0] длинна квадрата
						//  [номер квадрата][1][0-1] максимум, номер сэмпла 
						//  [номер квадрата][2][0-1] минимум, номер сэмпла 
						//  [номер квадрата][3][0-1] первый сэмпл, последний сэмпл
						//  [номер квадрата][4][0-1] пре пик, после пика
		//__________________С ЗАДЕРЖКОЙ СИГНАЛА
		//квадрат 4
		double old_4;
		//сбор информации о квадрате 4
		int count_sample_4;
		int count_4;
		double pick_4;
		double pick_4_old1;
		double pick_4_old2;
		double pick_4_future1;
		double pick_4_future2;
		int size_4;
		//5
		int count_5;
		double old_5;
		//Polar
		int polar_count;  
		//12 13
		double old_12;
		double old_13;

		//____ КЛАСС	
		DELAY *delay;
		KOSIE *kosie;

		//инициализация
		void init();
		
		// метод линии
		void line_core(int i);	
};


#endif