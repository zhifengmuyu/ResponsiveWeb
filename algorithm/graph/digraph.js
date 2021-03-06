var lettertoNumber={
A:0,
B:1,
C:2,
D:3,
E:4,
F:5,
G:6,
H:7,
}

var numbertoLetter = [
"A",
"B",
"C",
"D",
"E",
"F",
"G",
"H"
]

var digraph={
  total_v:0,//total number of vertex
  total_e:0,//total number of edge
  adjlist:[],
  
  initialize: function(alist){
  this.adjlist=alist;
  console.log("alist:" + alist.length)
  this.total_v=this.adjlist.length;
  },

  adj:function(i){//return adjcent list for vertex i
	return this.adjlist[i];
  },
  
  addEdge:function( v,  w){
	var adj_v = this.adjlist[v];
	this.adj_v[this.adj_v.length]=w;
	this.total_e=this.total_e+1;
  },
  
  reverse:function(){
  }
}

function bfs(dgraph,  start)
{
	var queue=[];
	queue.unshift(start);
	marked[start]= true;
	while(queue.length>0){
		var vex = queue.pop();
		console.log("vex=" +numbertoLetter[vex]); //log
		var adjarray=dgraph.adj(vex);
		for(var i = 0; i < adjarray.length; i++)
		{
			var adjv = adjarray[i];
			if(!marked[adjv]){
				marked[adjv] = true;//mark vertex, first time get it.
				queue.unshift(adjv);
				edgeto[adjv] = vex;
			}
		}
	}
}

//function DFS
function dfs(dgraph,  index){
	var adjarray=dgraph.adj(index);
	marked[index]=true;	//mark vertex, first time get it.
	console.log(index);
	//console.log("l:" +adjarray.length);
	for (var i = 0; i < adjarray.length; i++)
	{
		//console.log(adjarray[0]);
		var adjvex = adjarray[i];
		if(!marked[adjvex]){
			edgeto[adjvex]=index;
			dfs(dgraph, adjvex);
		}
		//console.log("never here:"+i);
	}
	reversepostorder.push(index);
}

//data
var data=[
[5,1],
[],
[0,3],
[5,2],
[3,2],
[4],
[9,4,8,0],
[6,9],
[6],
[11,10],
[12],
[4,12],
[9]
];

var datadiag=[
[5,1,6],
[],
[0,3],
[5],
[],
[4],
[9,4],
[6],
[7],
[11,10,12],
[],
[12],
[]
];
 
 var exam1data=[
 	[5]         ,
    [0, 6, 2 ]  ,
    []          ,
    [6, 2 ]     ,
    [0 ]        ,
    [1, 4 ]     ,
    [7, 5, 2]   ,
    [3]         
 ]
 
 var exam2data=[
[lettertoNumber.E ]														,
[lettertoNumber.C, lettertoNumber.A, lettertoNumber.F, lettertoNumber.E],
[lettertoNumber.G, lettertoNumber.D                                   ] ,
[lettertoNumber.H, lettertoNumber.G                                   ] ,
[]                                                                      ,
[lettertoNumber.G, lettertoNumber.E, lettertoNumber.C                 ] ,
[]                                                                      ,
[lettertoNumber.G                                                     ]
 ]
console.log(exam2data.length);
digraph.initialize(exam2data);
//var marked = new array(digraph.total_v);
var marked = [];
var edgeto = [];
var reversepostorder=[];
//var edgeto = new array(digraph.total_v);
console.log("start");

//bfs(digraph, 0);

 for(var v=0; v<digraph.total_v; v ++)
	 if(!marked[v])
		 dfs(digraph, v);

 console.log(edgeto);
 while(reversepostorder.length>0)
 { 
	var data = reversepostorder.pop();
	console.log("schedule " + numbertoLetter[data]);
  }
