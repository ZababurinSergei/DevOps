#ifndef __KOSIE_H__
#define __KOSIE_H__

class KOSIE
{
public: 
		//Global
		double *buff;
		int kuda;
		int w_size;
		int i;
		double *square_info_0;
		int count_4;
		int save; 
		//Settings
		int line1;   //kuda+6
		int line2;   //kuda+7
		int line3;   //kuda+8
		int line4;   //kuda+9
		//Local
		double raznica1;
		double step1;
		double kosaya1;
		int count1;
		double raznica2;
		double step2;
		double kosaya2;
		int count2;

		void init(){
			raznica1 = 0;
			step1 = 0;
			kosaya1 = 0;
			count1 = 0;
				
			raznica2 = 0;
			step2 = 0;
			kosaya2 = 0;
			count2 = 0;
				
			line1 = 0;
			line2 = 0;
			line3 = 0;
			line4 = 0;
		};

		void start();
};


#endif