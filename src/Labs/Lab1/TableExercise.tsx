export default function TableExercise () {
    return (
        <div id="wd-tables">
            <h4>Table Tag</h4>
            <table border={1} width="100%">
                <thead>
                <tr>
                    <th>Quiz</th>
                    <th>Topic</th>
                    <th>Date</th>
                    <th>Grade</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Q1</td>
                    <td align="center">HTML</td>
                    <td>2/3/21</td>
                    <td>85</td>
                </tr>
                <tr>
                    <td>Q2</td>
                    <td align="center">CSS</td>
                    <td>2/10/21</td>
                    <td>90</td>
                </tr>
                <tr>
                    <td>Q3</td>
                    <td align="center">JavaScript</td>
                    <td>2/17/21</td>
                    <td>95</td>
                </tr>
                <tr>
                    <td>Q4</td>
                    <td align="center">Q4</td>
                    <td>2/24/21</td>
                    <td>90</td>
                </tr>
                <tr>
                    <td>Q5</td>
                    <td align="center">Q5</td>
                    <td>3/3/21</td>
                    <td>90</td>
                </tr>
                <tr>
                    <td>Q6</td>
                    <td align="center">Q6</td>
                    <td>3/10/21</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Q7</td>
                    <td align="center">Q7</td>
                    <td>3/17/21</td>
                    <td>85</td>
                </tr>
                <tr>
                    <td>Q8</td>
                    <td align="center">Q8</td>
                    <td>3/24/21</td>
                    <td>95</td>
                </tr>
                <tr>
                    <td>Q9</td>
                    <td align="center">Q9</td>
                    <td>3/31/21</td>
                    <td>80</td>
                </tr>
                <tr>
                    <td>Q10</td>
                    <td align="center">Q10</td>
                    <td>4/7/21</td>
                    <td>100</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={3}>Average</td>
                    <td>91</td>
                </tr>
                </tfoot>
            </table>
        </div>

    );
}