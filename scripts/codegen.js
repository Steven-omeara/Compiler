function codegen(AST)
{
	var runtime = [];
	var statictable = [];
	var currlocation = 0;
	var currTregister = 0;
	var currStaticEntry = new staticentry();

	function staticentry(temp, vara, address)
	{
		this.temp = temp;
		this.vara = vara;
		this.address = address;

		this.getTemp = function()
		{
			return this.temp;
		};
		this.getVara = function()
		{
			return this.vara;
		};
		this.getAddress = function()
		{
			return this.address;
		};
		this.setAddress = function(address)
		{
			this.address = address;
		};
	}

	function scanST(varname)
	{
		for(i = 0; i < statictable.length; i++)
		{
			if (varname == statictable[i].getVara())
			{
				return statictable[i].getTemp().substring(0,2);
				break;
			}
		}
	}

	for (var i = 0; i < 256; i++)
	{
		runtime[i] = "00";
	}

	function addByte(bytename)
	{
		runtime[currlocation] = bytename;
		currlocation++;
	}

	function cgAST(AST)
	{
		 function expand(node)
        {

        	function block(node)
        	{
        		for (var i = 0; i < node.children.length; i++)
            	{
                	checkStmtList(node.children[i]);
            	}
        	}

        	function checkStmtList(node)
        	{
        		if(node.name == "varDecl")
        		{
        			if(node.children[0].name == "Int")
        			{
        				statictable.push(new staticentry("T" + currTregister + "XX", node.children[1].name, "+" + currlocation));
        				addByte("A9");
        				addByte("00");
        				addByte("8D");
        				addByte("T" + currTregister);
        				currTregister += 1;
        				addByte("XX");
        			}
        			else if(node.children[0].name == "Boolean")
        			{
        				statictable.push(new staticentry("T" + currTregister + "XX", node.children[1].name, "+" + currlocation));
        				addByte("A9");
        				addByte("00");
        				addByte("8D");
        				addByte("T" + currTregister);
        				currTregister += 1;
        				addByte("XX");
        			}
        		}
        		if(node.name == "Block")
        		{
        			block(node);
        		}
        		if(node.name == "If")
        		{
                       
        		}
        		if(node.name == "While")
        		{
                   
        		}
        		if(node.name == "Assign")
        		{
        			if (node.children[1].name == "+")
        			{

        			}
     				else
     				{
     					if(node.children[1].name == "True")
        				{
        					addByte("A9");
        					addByte("01");
        					addByte("8D");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        				}
        				else if(node.children[1].name == "False")
        				{
        					addByte("A9");
        					addByte("00");
        					addByte("8D");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        				}
        				else if(Number.isInteger(parseInt(node.children[1].name.valueOf())) == true)
        				{
        					addByte("A9");
        					addByte("0" + node.children[1].name);
        					addByte("8D");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        				}
        				else if(node.children[1].name.charAt(0) == '"')
        				{
        				
        				}
        				else
        				{
        					addByte("AD");
        					addByte(scanST(node.children[1].name));
        					addByte("XX");
        					addByte("8D");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        				}
        			}
        		}
        		if (node.name == "Print")
                {           
                	if (node.children[0].name == "+")
        			{
        				
        			}
     				else
     				{
     					if(node.children[0].name == "True")
        				{
        					addByte("A0");
        					addByte("01");
        					addByte("A2");
        					addByte("01");
        					addByte("FF");
        				}
        				else if (node.children[0].name == "False")
        				{
        					addByte("A0");
        					addByte("00");
        					addByte("A2");
        					addByte("01");
        					addByte("FF");
        				}
        				else if(Number.isInteger(parseInt(node.children[0].name.valueOf())) == true)
        				{

        				}
        				else if(node.children[0].name.charAt(0) == '"')
        				{
        				
        				}
        				else
        				{
        					addByte("AC");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        					addByte("A2");
        					addByte("01");
        					addByte("FF");
        				}
        			}
                }
        		else
        		{
        			if(node.children[1].name == "True" || node.children[1].name == "False")
        			{
        				
        			}
        			else if(Number.isInteger(parseInt(node.children[1].name.valueOf())) == true)
        			{
        				
        			}
        			else if(node.children[1].name.charAt(0) == '"')
        			{
        				
        			}
        			else
        			{
        				
        			}
        		}
                
        	}
        	if(node.name == "Block")
        	{
        		block(node);
        	}
        }

        expand(AST.root);

        function backpatch(statictable, runtime)
        {
        	for (j = 0; j < statictable.length; j++)
        	{
        		currlocation++;
        		if (currlocation < 16)
        		{
        			currhex = currlocation.toString(16);
        			currhex = "0" + currhex.toUpperCase();
        		}
        		else
        		{
        			currhex = currlocation.toString(16);
        			currhex.toUpperCase();
        		}
        		statictable[j].setAddress(currhex + " 00");		
        		for(k = 0; k < runtime.length; k++)
        		{
        			if(statictable[j].getTemp().substring(0,2) == runtime[k])
        			{
        				runtime[k] = currhex;
        				runtime[k + 1] = "00";
        			}
        		}
        	}
        }

        backpatch(statictable, runtime);

	}

	function printST(stattable)
	{
		putST("Static table for Program 1:");
		putST("-----------------------------------");
		for (i = 0; i < stattable.length; i++)
		{
			putST("Temp: " + stattable[i].getTemp() + "  Var: " + stattable[i].getVara() + "  Address: " + stattable[i].getAddress())
		}
	}

	cgAST(AST);

	printST(statictable);

	return runtime;
}