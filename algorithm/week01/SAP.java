import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.Digraph;
import edu.princeton.cs.algs4.Queue;
import edu.princeton.cs.algs4.BreadthFirstDirectedPaths;
import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;


public class SAP {
    //use a bfspath to store any vertex to anyother vertex.
    //ArrayList <BreadthFirstDirectedPaths> pathlist;
    Integer VN; // number of vertex totally
    Digraph DG;
    //constructor from a diag
    public SAP(Digraph G) {
        VN=G.V();
        DG = new Digraph(G);
    }
    
    // length of shortest ancestral path between v and w, -1 if no path
    public int length(int v, int w) {
        if(v > VN-1 || w > VN-1) {
            throw new java.lang.IndexOutOfBoundsException();
        }
        BreadthFirstDirectedPaths path_v = new BreadthFirstDirectedPaths(DG, v);//shortest path from source v
        BreadthFirstDirectedPaths path_w = new BreadthFirstDirectedPaths(DG, w);//shortest path from source w
        int minlength=Integer.MAX_VALUE;
        for (int ac = 0; ac < VN; ac++) { //iterate all possible ancestor
            if(path_v.hasPathTo(ac) && path_w.hasPathTo(ac)) {
                if(minlength > path_v.distTo(ac) + path_w.distTo(ac))
                    minlength = path_v.distTo(ac) + path_w.distTo(ac);
            }
        }
        return minlength == Integer.MAX_VALUE ? -1:minlength;
    }
    
    //return the common ancestor of v and w that belong to shortest ancestral path, -1 mean no ancestor
    public int ancestor(int v, int w) {
        if(v > VN-1 || w > VN-1) {
            throw new java.lang.IndexOutOfBoundsException();
        }
        
        BreadthFirstDirectedPaths path_v = new BreadthFirstDirectedPaths(DG, v);//shortest path from all vertex in set v
        BreadthFirstDirectedPaths path_w = new BreadthFirstDirectedPaths(DG, w);//shortest path from all vertex in set w

        int ancestor = -1;
        int minlength = Integer.MAX_VALUE;
        for (int ac = 0; ac < VN; ac++) { //iterate all possible ancestor
            if(path_v.hasPathTo(ac) && path_w.hasPathTo(ac)) {
                if(minlength > path_v.distTo(ac) + path_w.distTo(ac)) {
                    minlength = path_v.distTo(ac) + path_w.distTo(ac);
                    ancestor = ac;
                }
            }
        }
    // get the common ancestor that have the least of length from both vertex.
    return ancestor;
    }
    
    // length of shortest ancestral path between any vertex in v and any vertex in w, -1 means no such ancestor
    public int length(Iterable<Integer> v, Iterable<Integer> w) {
        if(v == null || w == null) {
            throw new java.lang.NullPointerException;
        }
        BreadthFirstDirectedPaths paths_v = new BreadthFirstDirectedPaths(DG, v);//shortest path from all vertex in set v
        BreadthFirstDirectedPaths paths_w = new BreadthFirstDirectedPaths(DG, w);//shortest path from all vertex in set w
        int minlength = Integer.MAX_VALUE;
        for (int ac = 0; ac < VN; ac++) { //iterate all possible ancestor
            if(paths_v.hasPathTo(ac) && paths_w.hasPathTo(ac)) {
                if(minlength > paths_v.distTo(ac) + paths_w.distTo(ac)) {
                    minlength = paths_v.distTo(ac) + paths_w.distTo(ac);
                }
            }
        }        
        return minlength == Integer.MAX_VALUE ? -1:minlength;
    }
    
    // a common ancestor that participate in shortest anestral path; -1 means no ancestor
    public int ancestor(Iterable<Integer> v, Iterable<Integer> w) {
        if(v == null || w == null) {
            throw new java.lang.NullPointerException;
        }

        BreadthFirstDirectedPaths paths_v = new BreadthFirstDirectedPaths(DG, v);//shortest path from all vertex in set v
        BreadthFirstDirectedPaths paths_w = new BreadthFirstDirectedPaths(DG, w);//shortest path from all vertex in set w
        int ancestor = -1;
        int minlength = Integer.MAX_VALUE;
        for (int ac = 0; ac < VN; ac++) { //iterate all possible ancestor
            if(paths_v.hasPathTo(ac) && paths_w.hasPathTo(ac)) {
                if(minlength > paths_v.distTo(ac) + paths_w.distTo(ac)) {
                    minlength = paths_v.distTo(ac) + paths_w.distTo(ac);
                    ancestor = ac;
                }
            }
        }        
        return ancestor;
    }
    //testing main 
    public static void main(String[] args) {
    In in = new In(args[0]);
    Digraph G = new Digraph(in);
    SAP sap = new SAP(G);
    while (!StdIn.isEmpty()) {
        int v1 = StdIn.readInt();
//        int v2 = StdIn.readInt();
        Queue<Integer> v = new Queue<Integer>();
        v.enqueue(v1);
//        v.enqueue(v2);
        int w1 = StdIn.readInt();
//        int w2 = StdIn.readInt();
        Queue<Integer> w = new Queue<Integer>();
        w.enqueue(w1);
//        w.enqueue(w2);
        
        int length   = sap.length(v, w);
        int ancestor = sap.ancestor(v, w);
        StdOut.printf("length = %d, ancestor = %d\n", length, ancestor);
    }
    }
}