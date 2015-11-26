import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.Digraph;
//import edu.princeton.cs.algs4.Queue;
//import edu.princeton.cs.algs4.BreadthFirstDirectedPaths;

import edu.princeton.cs.algs4.StdOut;

public class WordNet {
//the struct to store synsets
//the struct to store  SAP graph
    
    
   // constructor takes the name of the two input files
    public WordNet(String synsets, String hypernyms) {
    In in = new In(synsets);
    while (in.hasNextLine()) {
        String line = in.readLine();
        StdOut.println(line);
    }

    
    //construct the Digraph
    in = new In(hypernyms);
    int numberV=0;
    String lines[] = in.readAllLines();
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
        return false;
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
    }
}