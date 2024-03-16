$(document).ready(function() {
    const forumathonUrl = 'https://zxzancdbygtprcouqlim.supabase.co';
    const forumathonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4emFuY2RieWd0cHJjb3VxbGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1OTEzMzMsImV4cCI6MjAyNjE2NzMzM30.yh0Pbug8hettMgTXw1OjWCHv_IwbCrQMKNMs1JPQPQc';
    const { createClient } = supabase;
    const forumathonClient = createClient(forumathonUrl, forumathonKey);

    var goal = 1000;
    var level = 0;

    async function updateProgress() {
        forumathonClient.from('Forumathon_032024').select('mots').then(response => {
            var sum = response.data.reduce((acc, curr) => acc + curr.mots, 0);
            var percentage = (sum / goal) * 100;
            var nextLevel = level + 1;
            $("#progress").text(percentage + "% du palier" + nextLevel);
            $("#wordCount").text(sum + "mots");
            $("#goalCount").text(goal);
            $("#progress-bar").css("width", percentage + "%").text(sum);
            $("#level").text("Level: " + level);
        })
        .catch(error => {
            console.error('Error fetching data from Supabase:', error.message);
        });
    }

    $("#addBtn").click(function(){
        $("#addModal").css("display", "block");
    });
    $(".close").click(function(){
        $("#addModal").css("display", "none");
    });
    $(window).click(function(event) {
        if (event.target == $("#addModal")[0]) {
            $("#addModal").css("display", "none");
        }
    });
    $("#confirmBtn").click(function(){
        var newGoal = parseInt($("#goalInput").val());
        if (!isNaN(newGoal)) {
          forumathonClient.from('Forumathon_032024').insert([{ mots: newGoal }]).then(response => {
              updateProgress();
              $("#addModal").css("display", "none");
          })
          .catch(error => {
              console.error('Error adding new entry to Supabase:', error.message);
          });
        }
    });
  
    updateProgress();
    
});
