function setup()
{
	createCanvas(windowWidth, windowHeight);
}

function draw() 
{
	//line p5
	stroke("black");
	line(width/2, 0, width/2, height);
	line(0, height/2, width, height/2);
	line(width/4, height/2, width/4, height);

	//Circulo Punto Medio
	stroke("yellow");
	circPM(width/8, 700, 50);
	
	//Elipse Punto Medio
	stroke("purple");
	elipsePM(width/3, 700, 70, 50);
	
	//pp
	stroke("blue");
	ecuPP(0, 0, width/2, height/2);
	ecuPP(width/4, 0, width/4, height/2);
	ecuPP(width/2, 0, 0, height/2);
	ecuPP(0, height/4, width/2, height/4);
	
	//dda
	stroke("green");
	dda(width/2, 0, width, height/2);
	dda(width, 0, width/2, height/2);
	dda((width/4)*3, 0, (width/4)*3, height/2);
	dda(width/2, height/4, width, height/4);
	
	//bresenham
	stroke("red");
	bresenham(width/2, height/2, width, height);
	bresenham(width/2, height, width, height/2);
	bresenham((width/4)*3, height/2, (width/4)*3, height);
	bresenham(width/2, (height/4)*3, width, (height/4)*3);

	noLoop();
}

function ecuPP(x1, y1, x2, y2)
{
	let x = x1,
	y = y1,
	stepX = 1,
	stepY = 1;
	const dx = x2 - x1;
	const dy = y2 - y1;

	if (dx == 0) 
	{
	
		if (dy < 0) stepY = -1;
	
		while (y !== y2) 
		{
			point(x, y);
			y += stepY;
		}
	} 
	else 
	{
		const m = dy / dx;
		const b = y1 - m * x1;
	
		if (dx < 0) stepX = -1;
	
		while (x !== x2) 
		{
			point(x, y);
			x += stepX;
			y = m * x + b;
		}
	}
}

function dda(x1, y1, x2, y2)
{
	let x = x1,
	y = y1,
	dx = x2 - x1,
	dy = y2 - y1;
	
	const m = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
	const xIncrement = dx / m;
	const yIncrement = dy / m;

	for (let i = 0; i < m; i++)
	{
		x += xIncrement;
		y += yIncrement;
		point(x, y);
	}
}

function bresenham (x1, y1, x2, y2)
{
	let x = x1;
	let y = y1;
	let dx = x2 - x1;
	let dy = y2 - y1;
	let sx = 1;
	let sy = 1;

	if (dy < 0) 
	{
		dy = -dy;
		sy = -1;
	}
	
	if (dx < 0) 
	{
		dx = -dx;
		sx = -1;
	}
	
	if (dx > dy) 
	{
		let p = 2 * dy - dx;

		while (x != x2) 
		{
			point(x, y);
			x += sx;

			if (p < 0) 
			{
				p += 2 * dy;
			} 
			else 
			{
				y += sy;
				p += 2 * (dy - dx);
			}
		}
	} 
	else 
	{
		let p = 2 * dx - dy;

		while (y != y2) 
		{
			point(x, y);
			y += sy;
		
			if (p < 0) 
			{
				p += 2 * dx;
			} 
			else 
			{
				x += sx;
				p += 2 * (dx - dy);
			}
		}
	}
}

function circPM(xc, yc, r)
{
	let p = Math.round(5/4 - r);
	let x = -1;
	let y = r;

	while(x < y)
	{
		x++;

		printP(xc, x, yc, y);
		if(p < 0)
		{
			p = p + 2 * x + 1;
		}
		else
		{
			y--;

			p = p + 2 * (x - y) + 1;
		}

		printP(xc, x, yc, y);
	}

}

function elipsePM(xc, yc, rx, ry)
{
	let x, y, p;

	x = -1;
	y = ry;

	p = Math.round((ry*2) - (rx*2)*ry + 0.25*(rx*2));
	y --;

	while (y > 0) 
	{
		if (p > 0)
		{
			y --;
		} 
		else if (p < 0) 
		{
			x ++;
		}

		p = Math.round((ry*ry)*(x*x) + (rx*rx)*(y*y) - (rx*rx)*(ry*ry))+1;
		
		printElip(xc, x, yc, y);
	}

}

function printElip(xc, x, yc, y)
{
	point(xc + x, yc + y);
	point(xc + x, yc - y);
	point(xc - x, yc + y);
	point(xc - x, yc - y);
}

function printP(xc, x, yc, y)
{
	point(xc + x, yc + y);
	point(xc - x, yc + y);
	point(xc - x, yc - y);
	point(xc + x, yc - y);
	point(xc + y, yc + x);
	point(xc + y, yc - x);
	point(xc - y, yc - x);
	point(xc - y, yc + x);
}	