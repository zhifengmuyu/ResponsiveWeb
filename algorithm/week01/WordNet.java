import edu.princeton.cs.algs4.In; 
import edu.princeton.cs.algs4.Digraph; 

import edu.princeton.cs.algs4.BST; 
import edu.princeton.cs.algs4.Bag; 
import edu.princeton.cs.algs4.Queue; 

import edu.princeton.cs.algs4.StdIn;  
import edu.princeton.cs.algs4.StdOut; 

 
public class WordNet { 
//the struct to store synsets 
private String synsetTable[];     //table from id->nouns 
private BST<String, Bag<Integer>> bst;  // table for nouns. 
private SAP sap;
//the struct to store  SAP graph 
     
     
   // constructor takes the name of the two input files 
//?what if the sysset and the hypernyms not matched?
public WordNet(String synsets, String hypernyms) { 
    In in = new In(synsets); 
    String lines[] = in.readAllLines(); 
    
    bst = new BST<String, Bag<Integer>>(); 
    synsetTable = new String[lines.length]; 

    for (String oneSynset:lines) {
        String cols[] = oneSynset.split(","); 
        if(cols.length>1){ 
        int idsyn = Integer.parseInt(cols[0]); 
        String synsetnouns[] = cols[1].split(" "); 
        for(String noun : synsetnouns){ 
            if(bst.contains(noun)){
              Bag<Integer> bg = bst.get(noun);
              bg.add(idsyn);
              bst.put(noun, bg);
            } else {
                Bag<Integer> bg = new Bag<Integer>();
                bg.add(idsyn);
                bst.put(noun, bg);
            }
        } 
        
        synsetTable[idsyn] = cols[1];
      }
      else{
        //emmit error
      }
    } 
 
    //construct the Digraph 
    in = new In(hypernyms); 
    int numberV=0; 
    lines = in.readAllLines(); 
    //first Loop to find V 
        for(String line : lines) { 
            String numbers[] = line.split(","); 
            for(String numstr : numbers) { 
                numberV = numberV < Integer.parseInt(numstr) ? Integer.parseInt(numstr):numberV; 
            } 
        } 
    Digraph G = new Digraph(numberV+1); 
    //second Loop to add edge. 
    //StdOut.println(G.E()); 
    for(String line:lines) { 
         String numbers[] = line.split(","); 
         int v = Integer.parseInt(numbers[0]); 
         if(numbers.length > 1 ){ 
             for(int i = 1; i < numbers.length; i++) { 
                 int w = Integer.parseInt(numbers[i]); 
                 G.addEdge(v, w); 
                 //StdOut.println("new Edge " + v +" -> " + w);
             } 
        } 
    } 
    //check files match
    if(synsetTable.length != G.V())    {
        StdOut.println("******************************************");
        StdOut.println("Warning: number of synset in " + synsets + " is "+ synsetTable.length + " , while those in "+ hypernyms + " is " + G.V());
        StdOut.println("Please make sure they are of the same wordnet!");
    }
    
    sap = new SAP(G);
} 
    
   // returns all WordNet nouns 
    public Iterable<String> nouns() {
        Queue<String> queue = new Queue<String>();
        for (String synset:synsetTable) {
            String nouns[] = synset.split(" ");
            for(String n:nouns)
                queue.enqueue(n);
        }
        return queue;
    } 
 
   // is the word a WordNet noun? 
    public boolean isNoun(String word) { 
        return bst.contains(word);
    } 
 
   // distance between nounA and nounB (defined below) , f
    public int distance(String nounA, String nounB) {
        Bag<Integer> a = bst.get(nounA);
        Bag<Integer> b = bst.get(nounB);
        return sap.length(a, b);
    } 
 
   // a synset (second field of synsets.txt) that is the common ancestor of nounA and nounB 
   // in a shortest ancestral path (defined below) 
    public String sap(String nounA, String nounB) { 
        Bag<Integer> a = bst.get(nounA);
        Bag<Integer> b = bst.get(nounB);
        return synsetTable[sap.ancestor(a, b)];
    } 
 
   // do unit testing of this class 
    public static void main(String[] args) { 
        WordNet wn = new WordNet(args[0], args[1]); 
        StdOut.println("====================================");
        Queue<String> nouns = (Queue<String>)wn.nouns();
        for(String nn:nouns)
            StdOut.println(nn);
        
    while (!StdIn.isEmpty()) {
        String v = StdIn.readString();
        String w = StdIn.readString();
        if(wn.isNoun(v) && wn.isNoun(w)){
            int length   = wn.distance(v, w);
            String ancestor = wn.sap(v, w);
            StdOut.printf("length = %d, ancestor = %s\n", length, ancestor);
        }
    }
    } 
}