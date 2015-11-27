import edu.princeton.cs.algs4.In; 
import edu.princeton.cs.algs4.Digraph; 
import edu.princeton.cs.algs4.Bag; 
import edu.princeton.cs.algs4.BST; 
import edu.princeton.cs.algs4.ST; 
//import edu.princeton.cs.algs4.Queue; 
//import edu.princeton.cs.algs4.BreadthFirstDirectedPaths; 
 
import edu.princeton.cs.algs4.StdOut; 
import edu.princeton.cs.algs4.BST; 
 
public class WordNet { 
//the struct to store synsets 
private String synsetTable[];     //table from id->nouns 
private BST<String, Integer> bst;  // table for nouns. 
//the struct to store  SAP graph 
     
     
   // constructor takes the name of the two input files 
//?what if the sysset and the hypernyms not matched?
    public WordNet(String synsets, String hypernyms) { 
    In in = new In(synsets); 
    String lines[] = in.readAllLines(); 
    
    bst = new BST<String, Integer>(); 
    synsetTable = new String[lines.length]; 
    
    for (int v = 0; v < lines.length; v++) { //intialize 
      String oneSynset = lines[v]; 
      String cols[] = oneSynset.split(","); 
      if(cols.length>1){ 
        int idsyn = Integer.parseInt(cols[0]); 
        String synsetnouns[] = cols[1].split(" "); 
        for(String noun : synsetnouns){ 
          bst.put(noun,idsyn); 
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
    StdOut.println(G.E()); 
        for(String line : lines) { 
            String numbers[] = line.split(","); 
            int v = Integer.parseInt(numbers[0]); 
            if(numbers.length > 1 ){ 
                for(int i = 1; i < numbers.length; i++) { 
                    int w = Integer.parseInt(numbers[0]); 
                    G.addEdge(v, w); 
                } 
           } 
        } 
    StdOut.println(G.E()); 
    StdOut.println(G.V()); 
    } 
 
   // returns all WordNet nouns 
//    public Iterable<String> nouns() { 
      
//    } 
 
   // is the word a WordNet noun? 
    public boolean isNoun(String word) { 
        return bst.contains(word);
    } 
 
   // distance between nounA and nounB (defined below) 
    public int distance(String nounA, String nounB) { 
        return 0; 
    } 
 
   // a synset (second field of synsets.txt) that is the common ancestor of nounA and nounB 
   // in a shortest ancestral path (defined below) 
    public String sap(String nounA, String nounB) { 
        return ""; 
    } 
 
   // do unit testing of this class 
    public static void main(String[] args) { 
        WordNet wn = new WordNet(args[0], args[1]); 
        StdOut.println("====================================");
        StdOut.println(wn.isNoun("unit_cell"));
    } 
}