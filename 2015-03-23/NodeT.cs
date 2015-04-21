public class Node<T>
{
    public T Data { get; set; }
    public Node<T> Left { get; set; }
    public Node<T> Right { get; set; }
 
    public class NodeProperties<U>
    {
        public bool IsOrdered { get; set; }
        public U MinValue { get; set; }
        public U MaxValue { get; set; }
    }
 
    public bool IsOrdered(IComparer<T> comparer)
    {
        return GetProperties(comparer).IsOrdered;
    }
 
    private NodeProperties<T> GetProperties(IComparer<T> comparer)
    {
        NodeProperties<T> leftProps = (Left != null) ? Left.GetProperties(comparer) : null;
        NodeProperties<T> rightProps = (Right != null) ? Right.GetProperties(comparer) : null;
        var isOrdered = true;
        T leafMin;
        T leafMax;
 
        if (Left != null && Right != null)
        {
            leafMin = comparer.Compare(leftProps.MinValue, rightProps.MinValue) < 0 ? leftProps.MinValue : rightProps.MinValue;
            leafMax = comparer.Compare(leftProps.MaxValue, rightProps.MaxValue) > 0 ? leftProps.MaxValue : rightProps.MaxValue;
            isOrdered = leftProps.IsOrdered &&
                        rightProps.IsOrdered &&
                        comparer.Compare(leftProps.MaxValue, Data) < 0 &&
                        comparer.Compare(Data, rightProps.MinValue) < 0;
        }
        else if (Left != null && Right == null)
        {
            leafMin = leftProps.MinValue;
            leafMax = leftProps.MaxValue;
            isOrdered = leftProps.IsOrdered && comparer.Compare(leafMax, Data) < 0;
        }
        else if (Left == null && Right != null)
        {
            leafMin = rightProps.MinValue;
            leafMax = rightProps.MaxValue;
            isOrdered = rightProps.IsOrdered && comparer.Compare(Data, leafMax) < 0;
        }
        else
        {
            return new NodeProperties<T>() { IsOrdered = true, MinValue = Data, MaxValue = Data };
        }
 
        return new NodeProperties<T>()
        {
            IsOrdered = isOrdered,
            MinValue = comparer.Compare(leafMin, Data) < 0 ? leafMin : Data,
            MaxValue = comparer.Compare(leafMax, Data) > 0 ? leafMax : Data
        };
    }
}