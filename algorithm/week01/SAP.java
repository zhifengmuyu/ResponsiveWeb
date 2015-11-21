import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.Digraph;
import edu.princeton.cs.algs4.BreadthFirstDirectedPaths;
import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;
import java.util.ArrayList;

public class SAP {
    //use a bfspath to store any vertex to anyother vertex.
    ArrayList <BreadthFirstDirectedPaths> pathlist;
    Integer VN; // number of vertex totally
    //constructor from a diag
    public SAP(Digraph G) {
        pathlist = new ArrayList<BreadthFirstDirectedPaths>();
        VN=G.V();
        // create number of V arrays of paths
        for(int s = 0; s < VN; s ++) {
            BreadthFirstDirectedPaths path = new BreadthFirstDirectedPaths(G, s);
            pathlist.add(path);
        }
    }
    
    // length of shortest ancestral path between v and w, -1 if no path
    public int length(int v, int w) {
    //find all the common ancestor/destination, and compare to get the shortest path
        int minlength=Integer.MAX_VALUE;
        for (int ac = 0; ac < VN; ac++) { //iterate all possible ancestor
            if(pathlist.get(v).hasPathTo(ac) && pathlist.get(w).hasPathTo(ac)) {
                if(minlength > pathlist.get(v).distTo(ac) + pathlist.get(w).distTo(ac))
                    minlength = pathlist.get(v).distTo(ac) + pathlist.get(w).distTo(ac);
            }
        }
        return minlength == Integer.MAX_VALUE ? -1:minlength;
    }
    
    //return the common ancestor of v and w that belong to shortest ancestral path, -1 mean no ancestor
    public int ancestor(int v, int w) {
    //find all the common ancestor/destination
        int ancestor = -1;
        int minlength = Integer.MAX_VALUE;
        for (int ac = 0; ac < VN; ac++) { //iterate all possible ancestor
            if(pathlist.get(v).hasPathTo(ac) && pathlist.get(w).hasPathTo(ac)) {
                if(minlength > pathlist.get(v).distTo(ac) + pathlist.get(w).distTo(ac)) {
                    minlength = pathlist.get(v).distTo(ac) + pathlist.get(w).distTo(ac);
                    ancestor = ac;
                }
            }
        }
    // get the common ancestor that have the least of length from both vertex.
    return ancestor;
    }
    
    // length of shortest ancestral path between any vertex in v and any vertex in w, -1 means no such ancestor
    public int length(Iterable<Integer> v, Iterable<Integer> w) {
        BreadthFirstDirectedPaths paths_v = new BreadthFirstDirectedPaths(G, w);
        BreadthFirstDirectedPaths paths_w = new BreadthFirstDirectedPaths(G, w);
        
        return 0;
    }
    
    // a common ancestor that participate in shortest anestral path; -1 means no ancestor
    public int ancestor(Iterable<Integer> v, Iterable<Integer> w) {
        return 0;
    }
    //testing main 
    public static void main(String[] args) {
    In in = new In(args[0]);
    Digraph G = new Digraph(in);
    SAP sap = new SAP(G);
    while (!StdIn.isEmpty()) {
        int v = StdIn.readInt();
        int w = StdIn.readInt();
        int length   = sap.length(v, w);
        int ancestor = sap.ancestor(v, w);
        StdOut.printf("length = %d, ancestor = %d\n", length, ancestor);
    }
    }
}