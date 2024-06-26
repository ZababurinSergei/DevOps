#include "kosie.h"

void KOSIE::start(){
		// ѕќЋя–Ќќ—“№ 1
		if(buff[i+(kuda+line1)*w_size] != 0 && buff[i+(kuda+line2)*w_size] != 0){ // если не равно 0
				if(buff[i+(kuda+line1)*w_size] > buff[i+(kuda+line2)*w_size]){ // если 6 > 7
						if(step1 == 0){  // если нет шага расчитываем
								raznica1 = buff[i+(kuda+line1)*w_size] - buff[i+(kuda+line2)*w_size]; // разница
								step1 = raznica1 / (square_info_0[count_4*5*2 + 2*1 + 1] - 2);
						};
						if(count1 > 0 && count1 < square_info_0[count_4*5*2 + 2*1 + 1] - 2){
								kosaya1 += step1;
								buff[i+(kuda+save+0)*w_size] = buff[i+(kuda+line2)*w_size] + kosaya1;
								buff[i+(kuda+save+1)*w_size] = buff[i+(kuda+line1)*w_size] - kosaya1;  
						};
						count1++;
									
						buff[i+(kuda+save+4)*w_size] = buff[i+(kuda+line2)*w_size] + kosaya1; 
						if(count1 == square_info_0[count_4*5*2 + 2*1 + 1] - 1)
								buff[i+(kuda+save+4)*w_size] = buff[i+(kuda+line1)*w_size];
												
						buff[i+(kuda+save+5)*w_size] = buff[i+(kuda+line1)*w_size] - kosaya1;  
						if(count1 == square_info_0[count_4*5*2 + 2*1 + 1] - 1)
								buff[i+(kuda+save+5)*w_size] = buff[i+(kuda+line2)*w_size];
												

				}else if(buff[i+(kuda+line1)*w_size] < buff[i+(kuda+line2)*w_size]){ // если 7 > 6
						if(step1 == 0){  // если нет шага расчитываем
								raznica1 = buff[i+(kuda+line2)*w_size] - buff[i+(kuda+line1)*w_size]; // разница
								step1 = raznica1 / (square_info_0[count_4*5*2 + 2*1 + 1] - 2);
						};
						if(count1 > 0 && count1 < square_info_0[count_4*5*2 + 2*1 + 1] - 2){
								kosaya1 += step1;
								buff[i+(kuda+save+0)*w_size] = buff[i+(kuda+line2)*w_size] - kosaya1; 
								buff[i+(kuda+save+1)*w_size] = buff[i+(kuda+line1)*w_size] + kosaya1;  
						};
						count1++;
										
						buff[i+(kuda+save+4)*w_size] = buff[i+(kuda+line2)*w_size] - kosaya1;
						if(count1 == square_info_0[count_4*5*2 + 2*1 + 1] - 1)
								buff[i+(kuda+save+4)*w_size] = buff[i+(kuda+line1)*w_size];
												
						buff[i+(kuda+save+5)*w_size] = buff[i+(kuda+line1)*w_size] + kosaya1;  
						if(count1 == square_info_0[count_4*5*2 + 2*1 + 1] - 1)
								buff[i+(kuda+save+5)*w_size] = buff[i+(kuda+line2)*w_size];
				};

		}else{  
				raznica1 = 0;
				step1 = 0;
				kosaya1 = 0;
				count1 = 0;
		};
						
		// ѕќЋя–Ќќ—“№ 2
		if(buff[i+(kuda+line3)*w_size] != 0 && buff[i+(kuda+line4)*w_size] != 0){ // если не равно 0
				if(buff[i+(kuda+line3)*w_size] > buff[i+(kuda+line4)*w_size]){ // если 8 > 9
						if(step2 == 0){  // если нет шага расчитываем
								raznica2 = buff[i+(kuda+line3)*w_size] - buff[i+(kuda+line4)*w_size]; // разница
								step2 = raznica2 / (square_info_0[count_4*5*2 + 2*0 + 0] - square_info_0[count_4*5*2 + 2*1 + 1]);
						};
						if(count2 > 0 && count2 < square_info_0[count_4*5*2 + 2*0 + 0] - square_info_0[count_4*5*2 + 2*1 + 1]){
								kosaya2 += step2;
								buff[i+(kuda+save+2)*w_size] = buff[i+(kuda+line4)*w_size] + kosaya2;
								buff[i+(kuda+save+3)*w_size] = buff[i+(kuda+line3)*w_size] - kosaya2; 
						};
						count2++;
									
						buff[i+(kuda+save+6)*w_size] = buff[i+(kuda+line4)*w_size] + kosaya2;  
						if(count2 == square_info_0[count_4*5*2 + 2*0 + 0] + 1 - square_info_0[count_4*5*2 + 2*1 + 1])
								buff[i+(kuda+save+6)*w_size] = buff[i+(kuda+line3)*w_size];
												
						buff[i+(kuda+save+7)*w_size] = buff[i+(kuda+line3)*w_size] - kosaya2; 
						if(count2 == square_info_0[count_4*5*2 + 2*0 + 0] + 1 - square_info_0[count_4*5*2 + 2*1 + 1])
								buff[i+(kuda+save+7)*w_size] = buff[i+(kuda+line4)*w_size];
												

				}else if(buff[i+(kuda+line3)*w_size] < buff[i+(kuda+line4)*w_size]){ // если 9 > 8
						if(step2 == 0){  // если нет шага расчитываем
								raznica2 = buff[i+(kuda+line4)*w_size] - buff[i+(kuda+line3)*w_size]; // разница
								step2 = raznica2 / (square_info_0[count_4*5*2 + 2*0 + 0] - square_info_0[count_4*5*2 + 2*1 + 1]);
						};
						if(count2 > 0 && count2 < square_info_0[count_4*5*2 + 2*0 + 0] - square_info_0[count_4*5*2 + 2*1 + 1]){
								kosaya2 += step2;
								buff[i+(kuda+save+2)*w_size] = buff[i+(kuda+line4)*w_size] - kosaya2; 
								buff[i+(kuda+save+3)*w_size] = buff[i+(kuda+line3)*w_size] + kosaya2;  
						};
						count2++;
										
						buff[i+(kuda+save+6)*w_size] = buff[i+(kuda+line4)*w_size] - kosaya2;
						if(count2 == square_info_0[count_4*5*2 + 2*0 + 0] + 1 - square_info_0[count_4*5*2 + 2*1 + 1])
								buff[i+(kuda+save+6)*w_size] = buff[i+(kuda+line3)*w_size];
												
						buff[i+(kuda+save+7)*w_size] = buff[i+(kuda+line3)*w_size] + kosaya2;
						if(count2 == square_info_0[count_4*5*2 + 2*0 + 0] + 1 - square_info_0[count_4*5*2 + 2*1 + 1])
								buff[i+(kuda+save+7)*w_size] = buff[i+(kuda+line4)*w_size];
				};

		}else{  
				raznica2 = 0; 
				step2 = 0;
				kosaya2 = 0;
				count2 = 0;
		}; 
};