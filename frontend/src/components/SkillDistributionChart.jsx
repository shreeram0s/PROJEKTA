import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SkillDistributionChart = ({ resumeSkills, jobSkills, missingSkills }) => {
  // Prepare data for the pie chart
  const data = [
    { name: 'Matched Skills', value: resumeSkills.filter(skill => jobSkills.includes(skill)).length },
    { name: 'Missing Skills', value: missingSkills.length },
  ];

  const COLORS = ['#3b82f6', '#ef4444'];

  // Calculate percentages
  const totalSkills = data[0].value + data[1].value;
  const matchedPercentage = totalSkills > 0 ? Math.round((data[0].value / totalSkills) * 100) : 0;
  const missingPercentage = totalSkills > 0 ? Math.round((data[1].value / totalSkills) * 100) : 0;

  return (
    <div className="bg-background border rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-6 text-center">Skill Distribution</h3>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Matched Skills</span>
                <span className="font-bold text-blue-500">{matchedPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${matchedPercentage}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {data[0].value} out of {totalSkills} skills matched
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Missing Skills</span>
                <span className="font-bold text-red-500">{missingPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{ width: `${missingPercentage}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {data[1].value} skills needed to improve match
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDistributionChart;