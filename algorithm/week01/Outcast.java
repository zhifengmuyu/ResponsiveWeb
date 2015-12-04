import edu.princeton.cs.algs4.StdIn;  
import edu.princeton.cs.algs4.StdOut; 
import edu.princeton.cs.algs4.In; 

public class Outcast {
  WordNet wn;
  Integer[] cache_matrix;
  
  public Outcast(WordNet wordnet){
    if(wordnet == null){
      throw new NullPointerException();
    }
    wn = wordnet;
  }
  
  public String outcast(String[] nouns){
    cache_matrix = new Integer[nouns.length*nouns.length];
    int max_dist=-1;
    int i_max_noun=-1;
    for(int i = 0; i < cache_matrix.length; i++){//inistialize
      cache_matrix[i] = -1;
    }
    
    for(int i = 0; i < nouns.length; i++) {
      int distance = sumDistance(i, nouns);
      if(max_dist < distance) {
        max_dist = distance;
        i_max_noun = i;
      }
      
    }
    
    if(i_max_noun == -1)
      return "";
    else
      return nouns[i_max_noun];
  }
  
  private Integer sumDistance(int index, String[] nouns) {
    int sum = 0;
    
    for(int i = 0; i < nouns.length; i++) {
      int calc_index = index*nouns.length + i;
      int correspond_index = i*nouns.length + index;
      if(cache_matrix[calc_index] == -1) {
        cache_matrix[calc_index] = wn.distance(nouns[index], nouns[i]);
        cache_matrix[correspond_index] = cache_matrix[calc_index];
      }
      sum += cache_matrix[calc_index];
    }
    return sum;
  }
  
  public static void main(String[] args){
    WordNet wordnet = new WordNet(args[0], args[1]);
    Outcast outcast = new Outcast(wordnet);
    
    for (int t = 2; t < args.length; t++) {
        In in = new In(args[t]);
        String[] nouns = in.readAllStrings();
        StdOut.println(args[t] + ": " + outcast.outcast(nouns));
    }
  }
}