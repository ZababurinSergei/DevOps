#include "line_function.h"
#include "functions.h"

//инициализация
void LINE_FUNCTION::init()
{
		old_s0 = 0;
		old_s1 = 0;
		old_s2 = 0;
		old_0 = 0;
		count_sample_0 = 0;
		count_0 = 0;
		square_info_0 = new double[w_size*5*2];
		set_0(square_info_0, w_size*5*2);
		old_4 = 0;
		count_sample_4 = 0;
		count_4 = 0;
		pick_4 = 0;
		pick_4_old1 = 0;
		pick_4_old2 = 0;
		pick_4_future1 = 0;
		pick_4_future2 = 0;
		size_4 = 0;
		count_5 = 0;
		old_5 = 0;
		polar_count = 0;
		old_12 = 0;
		old_13 = 0;
								
		//УСТАНОВКА ПАРАМЕТРОВ ДЛЯ КОСЫХ
		//статичные данные
		kosie = new KOSIE[2];    // Массив классов
		// 1й КЛАСС
		kosie[0].w_size = w_size;
		kosie[0].kuda = kuda;
		kosie[0].buff = buff;
		kosie[0].square_info_0 = square_info_0;
		kosie[0].init();
		//информационные (между какими линиями рисуем косые)
		kosie[0].line1 = 6; 
		kosie[0].line2 = 7;
		kosie[0].line3 = 9; 
		kosie[0].line4 = 10;
		kosie[0].save = 18;  // куда сохраняем 8 подрят 
		// 2й КЛАСС  тоже самое только за место 0 ставим 1  и тд....
		kosie[1].w_size = w_size;
		kosie[1].kuda = kuda;
		kosie[1].buff = buff;
		kosie[1].square_info_0 = square_info_0;
		kosie[1].init();
		//информационные (между какими линиями рисуем косые)
		kosie[1].line1 = 6; 
		kosie[1].line2 = 7;
		kosie[1].line3 = 9; 
		kosie[1].line4 = 10;
		kosie[1].save = 26;  // куда сохраняем 8 подрят 
};
		
// метод линии
void LINE_FUNCTION::line_core(int i)   // посыл минимум 3 сигнала поподрят в памяти
{  
//_______________ ЛИНИИ БЕЗ ЗАДЕРЖКИ_________________________
		//_______ оригинал для delay
		//s переменные для удобства
		double s0 = buff[i+(otkuda+0)*w_size];
		double s1 = buff[i+(otkuda+1)*w_size];
		double s2 = buff[i+(otkuda+2)*w_size];

		//______0 Квадрат без зежержки
		if(s1 > 0 && old_0 > 0)   
				buff[i+(kuda+0)*w_size] = 1;   // +
		else if(s1 < 0 && old_0 < 0)
				buff[i+(kuda+0)*w_size] = -1;   // -
		else if(old_0 <= 0 && s1 > 0)
				buff[i+(kuda+0)*w_size] = 1;   // +
		else if(old_0 >= 0 && s1 < 0)
				buff[i+(kuda+0)*w_size] = -1;   // -
		else if(old_0 < 0 && s1 == 0)
				buff[i+(kuda+0)*w_size] = old_0;   //защита от одного 0
		else if(old_0 > 0 && s1 == 0)
				buff[i+(kuda+0)*w_size] = old_0;   //защита от одного 0
		else if(old_0 == 0 && s1 == 0)
				buff[i+(kuda+0)*w_size] = 0;   //0

		// убираем отрицательную часть у s0 s1 s2
		if(buff[i+(otkuda+0)*w_size] < 0) 
				s0 *= -1;
		if(buff[i+(otkuda+1)*w_size] < 0) 
				s1 *= -1;
		if(buff[i+(otkuda+2)*w_size] < 0) 
				s2 *= -1;

		//_______________  Сбор всей информации о 0 квадрате
		if(buff[i+(kuda+0)*w_size] != old_0){   // новый квадрат 
				if(count_sample_0 > 0)  // ДЛИННА ПРОШЛОГО КВАДРАТА
						square_info_0[count_0*5*2 + 0*2 + 0] = count_sample_0;
				//сбор крайних амплитуд квадрата
				square_info_0[count_0*5*2 + 2*3 + 1] = s2; // последний сэмпл
	
				count_0++;   // СЧЁТ КВАДРАТОВ
				if(count_0 > w_size)  // если счёт квадратом больше  w_size  начинаем заного
						count_0 = 0;
				count_sample_0 = 0; // обнуляем счетчик сэмплов
								
				//сбор крайних амплитуд квадрата
				square_info_0[count_0*5*2 + 2*3 + 0] = s1; // первый сэмпл
		};		
						
		// поиск максимума
		if(s1 > square_info_0[count_0*5*2 + 2*1 + 0]) {
				square_info_0[count_0*5*2 + 2*1 + 0] = s1;   // амплитуда
				square_info_0[count_0*5*2 + 2*1 + 1] = count_sample_0;		// номер сэмпла
				//пре-пик значение
				square_info_0[count_0*5*2 + 2*4 + 0] = s2;  // сэмпл перед пиком
				// сэмпл после пика
				square_info_0[count_0*5*2 + 2*4 + 1] = s0;  // сэмпл после пика
		};
												
		//__________________Счёт сэмплов______________
		if(buff[i+(kuda+0)*w_size] != 0)   // МОЖНО ДОПИСАТЬ INIT
				count_sample_0++;
						


		//_______________ ЛИНИИ  ЗАДЕРЖКА_________________________
		//_______________  1 2 3  задержка сигнала на 1 cэмпл
		//d переменные для удобства

		delay->delay_signal(otkuda+0, kuda+1, w_size, 0, i);  //задерживаем сигнал на окно
		delay->delay_signal(otkuda+1, kuda+2, w_size, 1, i);  //задерживаем сигнал на окно
		delay->delay_signal(otkuda+2, kuda+3, w_size, 2, i);  //задерживаем сигнал на окно

		double d0 = buff[i+(kuda+1)*w_size];
		double d1 = buff[i+(kuda+2)*w_size];
		double d2 = buff[i+(kuda+3)*w_size];

		//______4 Квадрат c задержкой
		if(d1 > 0 && old_4 > 0)   
				buff[i+(kuda+4)*w_size] = 1;   // +
		else if(d1 < 0 && old_4 < 0)
				buff[i+(kuda+4)*w_size] = -1;   // -
		else if(old_4 <= 0 && d1 > 0)
				buff[i+(kuda+4)*w_size] = 1;   // +
		else if(old_4 >= 0 && d1 < 0)
				buff[i+(kuda+4)*w_size] = -1;   // -
		else if(old_4 < 0 && d1 == 0)
				buff[i+(kuda+4)*w_size] = old_4;   //защита от одного 0
		else if(old_4 > 0 && d1 == 0)
				buff[i+(kuda+4)*w_size] = old_4;   //защита от одного 0
		else if(old_4 == 0 && d1 == 0)
				buff[i+(kuda+4)*w_size] = 0;   //0

		// убираем отрицательную часть
		if(buff[i+(kuda+1)*w_size] < 0) 
				d0 = buff[i+(kuda+1)*w_size] *= -1;
		if(buff[i+(kuda+2)*w_size] < 0) 
				d1 = buff[i+(kuda+2)*w_size] *= -1;
		if(buff[i+(kuda+3)*w_size] < 0) 
				d2 = buff[i+(kuda+3)*w_size] *= -1;


		//_______________  Сбор всей информации о квадрате 4
		if(buff[i+(kuda+4)*w_size] != old_4){   // новый квадрат 
				//ПРОШЛОЕ
				pick_4_old2 = pick_4_old1;  // позапрошлый пик
				pick_4_old1 = pick_4;   // прошлый пик
						
				//_____СТАРОЕ ОБНУЛЯЕМ
   				square_info_0[count_4*5*2 + 2*0 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*1 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*1 + 1] = 0; 
				square_info_0[count_4*5*2 + 2*2 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*2 + 1] = 0;  
				square_info_0[count_4*5*2 + 2*3 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*3 + 1] = 0;  
				square_info_0[count_4*5*2 + 2*4 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*4 + 1] = 0;  
				pick_4 = 0;
				size_4 = 0;
				count_sample_4 = 0;
				//______________________

				count_4++;   // счетчик квадратов
				if(count_4 > w_size)
						count_4 = 0;
										
				//НАСТОЯЩЕЕ
				pick_4 = square_info_0[count_4*5*2 + 2*1 + 0]; 
				size_4 = (int)square_info_0[count_4*5*2 + 2*1 + 1]; 
								
				//БУДУЩЕЕ
				if(count_4 + 1 > w_size )
						pick_4_future1 = square_info_0[0*5*2 + 2*1 + 0]; // если перебор идём на начало 
				else
						pick_4_future1 = square_info_0[(count_4+1)*5*2 + 2*1 + 0]; // если перебор идём на начало 
										
				if(count_4 + 2 == w_size+2 )
						pick_4_future2 = square_info_0[1*5*2 + 2*1 + 0]; // если перебор идём на начало 
				else if(count_4 + 2 == w_size+1 )
						pick_4_future2 = square_info_0[0*5*2 + 2*1 + 0]; // если перебор идём на начало 
				else
						pick_4_future2 = square_info_0[(count_4+2)*5*2 + 2*1 + 0]; // если перебор идём на начало 
		};	
						
		//__________________Счёт сэмплов______________
		if(buff[i+(kuda+4)*w_size] != 0)   // счетчик сэмплов
				count_sample_4++;

		//_______________  5 Квадрат по максимальным пикам
		if(count_sample_4 == size_4+1 && buff[i+(kuda+4)*w_size] != 0) {
				if(count_5 == 0)
						count_5 = 1;
				else if(count_5 == 1)
						count_5 = -1;
				else if(count_5 == -1)
						count_5 = 1;
				buff[i+(kuda+5)*w_size] = count_5;
		} else {
				buff[i+(kuda+5)*w_size] = count_5;
		};

		//_______________  СЧЁТЧИК ПОЛЯРНОСТЕЙ	(4 3 2 1)
		if(buff[i+(kuda+4)*w_size] != 0 && polar_count == 0){ // если сигнал 1 есть и полярность 0 Стартуем
				if(buff[i+(kuda+4)*w_size] > 0)
						polar_count = 4;
				else if(buff[i+(kuda+4)*w_size] < 0)
						polar_count = 2;
		}else if(buff[i+(kuda+4)*w_size] != old_4 ) {  // смена квадрата
				if(buff[i+(kuda+4)*w_size] > 0)
						polar_count = 4;
				else if(buff[i+(kuda+4)*w_size] < 0)
						polar_count = 2;
		}else if(count_sample_4 == square_info_0[count_4*5*2 + 2*1 + 1] && buff[i+(kuda+4)*w_size] != 0) {  // смена квадрата
				if(polar_count == 4)
						polar_count = 3;
				else if(polar_count == 2)
						polar_count = 1;
		};
						
		//_____________________6 7 8 9 10 11 Линии 
			
		if(polar_count == 4 || polar_count == 2){
				buff[i+(kuda+6)*w_size] = pick_4;
				buff[i+(kuda+7)*w_size] = pick_4_future1;
				buff[i+(kuda+8)*w_size] = pick_4_old1;
								
				buff[i+(kuda+30)*w_size] = pick_4_future2;
				buff[i+(kuda+31)*w_size] = pick_4_old2;
		};
						
		if(polar_count == 3 || polar_count == 1){
				buff[i+(kuda+9)*w_size] = pick_4;
				buff[i+(kuda+10)*w_size] = pick_4_future1;
				buff[i+(kuda+11)*w_size] = pick_4_old1;
								
				buff[i+(kuda+32)*w_size] = pick_4_future2;
				buff[i+(kuda+33)*w_size] = pick_4_old2;
		};

		//_______________  12 13 линии  от первого сэмпла и последнего в квадрате
		if(buff[i+(kuda+4)*w_size] != 0) {  // если есть квадрат от 1 сигнала
				if(buff[i+(kuda+4)*w_size] != old_4 || buff[i+(kuda+5)*w_size] != old_5) {  // если сработал квадрат от 0 или от максимального
						if(polar_count == 4 || polar_count == 2){
								old_12 = square_info_0[count_4*5*2 + 2*3 + 0];
								old_13 = 0;
						} else if(polar_count == 3 || polar_count == 1) {
								old_12 = 0;
								old_13 = square_info_0[count_4*5*2 + 2*3 + 1];
						};
				};
				buff[i+(kuda+12)*w_size] = old_12;
				buff[i+(kuda+13)*w_size] = old_13;
		};

		//_______________  14 15 16 17  линии от пре пика сэмпла и после пикого значения  собранно парами нечет чёт 
			
		if(polar_count == 4 || polar_count == 2){
				buff[i+(kuda+14)*w_size] = square_info_0[count_4*5*2 + 2*4 + 0];
				buff[i+(kuda+15)*w_size] = square_info_0[count_4*5*2 + 2*4 + 1];
		}
			
		if(polar_count == 3 || polar_count == 1){
				buff[i+(kuda+16)*w_size] = square_info_0[count_4*5*2 + 2*4 + 1];
				buff[i+(kuda+17)*w_size] = square_info_0[count_4*5*2 + 2*4 + 0];
		};

		if(count_sample_4 == square_info_0[count_4*5*2 + 2*1 + 1]){
				buff[i+(kuda+14)*w_size] = 0;
				buff[i+(kuda+15)*w_size] = 0;
				buff[i+(kuda+16)*w_size] = 0;
				buff[i+(kuda+17)*w_size] = 0;
		};

		//________________ КОСЫЕ
		//передача динамических данных
		//1й КЛАСС
		kosie[0].i = i;
		kosie[0].count_4 = count_4;
		kosie[0].start();
		//2й КЛАСС
		kosie[1].i = i;
		kosie[1].count_4 = count_4;
		kosie[1].start();

		//___________ПРОШЛОЕ
		old_s0 = s0;
		old_s1 = s1;
		old_s2 = s2;
		old_0 = buff[i+(kuda+0)*w_size];
		old_4 = buff[i+(kuda+4)*w_size];
		old_5 = buff[i+(kuda+5)*w_size];
		old_12 = buff[i+(kuda+12)*w_size];
		old_13 = buff[i+(kuda+13)*w_size];
};	
