function codegen(AST)
{
	var runtime = [];
	var statictable = [];
	var currlocation = 0;
	var currTregister = 2;
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

	statictable.push(new staticentry("T0XX", "Temp0", "none"));
	statictable.push(new staticentry("T1XX", "Temp1", "none"));

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
        				currNode = node.children[0];
        				//sumofleft = 0;
        				//finalhex = "";
        				passthroughs = 0;

        				addByte("A9");
        				addByte("0" + currNode.children[0].name);
        				addByte("8D");
        				addByte("T0");
        				addByte("XX");

        				function addints(currNode)
        				{
        					if (currNode.children[1].name == "+")
        					{
        						//sumofleft += currNode.children[0].name;
        						//Load the accumulator with new value and add it to previous value
        						if(passthroughs == 0)
        						{
        							passthroughs++;
        						}
        						else
        						{
        							addByte("A9");
        							addByte("0" + currNode.children[0].name);
        							addByte("6D");
        							addByte("T0");
        							addByte("XX");
        							addByte("8D");
        							addByte("T0");
        							addByte("XX");
        						}
        						addints(currNode.children[1]);
        					}
        					else
        					{
        						if(Number.isInteger(parseInt(currNode.children[1].name.valueOf())) == true)
        						{
        							if(passthroughs == 0)
        							{
        								//Load the accumulator with right value
        								addByte("A9");
        								addByte("0" + currNode.children[1].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								//Do the final addition
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								addByte("A2");
        								addByte("01");
        								addByte("AC");
        								addByte("T0");
        								addByte("XX");
        								addByte("FF");
        							}
        							else
        							{
        								//Load the accumulator with the value, add it and store it in T0
        								addByte("A9");
        								addByte("0" + currNode.children[0].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Do this again
        								addByte("A9");
        								addByte("0" + currNode.children[1].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Load the x value with 1, and load the acumulator with the value of t1 and print
        								addByte("A2");
        								addByte("01");
        								addByte("AC");
        								addByte("T0");
        								addByte("XX");
        								addByte("FF");
        							}
        							//sumofleft += parseInt(currNode.children[0].name) + parseInt(currNode.children[1].name);
        							//finalhex = sumofleft.toString(16);
        							//Print the final answer
        							//if (finalhex.length < 2)
        							//{
        								//finalhex = "0" + finalhex.toUpperCase();
        							//}
     								//addByte("A0");
        							//addByte(finalhex);
        							//addByte("A2");
        							//addByte("01");
        							//addByte("FF");
        						}
        						//My type check will only let ints and variables through here
        						else
        						{

        						}
        					}
        				}
        				addints(currNode);
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
        					addByte("A0");
        					addByte("0" + node.children[0].name);
        					addByte("A2");
        					addByte("01");
        					addByte("FF");
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