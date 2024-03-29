$(document).ready(function() {
    const forumathonUrl = 'https://zxzancdbygtprcouqlim.supabase.co';
    const forumathonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4emFuY2RieWd0cHJjb3VxbGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1OTEzMzMsImV4cCI6MjAyNjE2NzMzM30.yh0Pbug8hettMgTXw1OjWCHv_IwbCrQMKNMs1JPQPQc';
    const { createClient } = supabase;
    const forumathonClient = createClient(forumathonUrl, forumathonKey);

    var goal = 5000;
    var level = 1;

    jQuery(function($) {
          if (_userdata["user_id"] > (0)){
              $('#addBtn').css("display", "inline-block");
          }
      });

    async function updateProgress() {
        forumathonClient.from('Forumathon_032024').select('mots').then(response => {
            var sum = response.data.reduce((acc, curr) => acc + curr.mots, 0);
            var percentage = (sum / goal) * 100;
            var wordsToGoal = (goal - sum);
            var nextLevel = level + 1;
            $("#progress").text(wordsToGoal + " mots");
            $("#nextLevel").text("palier " + nextLevel);
            $("#wordCount").text(sum + "/" + goal);
            $("#progress-bar").css("width", percentage + "%");
            $("#level").text("Palier " + level);

            while (sum >= goal) {
                level++;
                goal += 5000;
            }
        })
        .catch(error => {
            console.error('Error fetching data from Supabase:', error.message);
        });
    }

    $("#addBtn").click(function(){
        $("#addModal").css("display", "block");
        $("#addBtn").css("display", "none");
    });
    $(".close").click(function(){
        $("#addModal").css("display", "none");
        $("#addBtn").css("display", "inline-block");
    });
    $(window).click(function(event) {
        if (event.target == $("#addModal")[0]) {
            $("#addModal").css("display", "none");
            $("#addBtn").css("display", "inline-block");
        }
    });
    $("#confirmBtn").click(function(){
        var newGoal = parseInt($("#goalInput").val());
        if (!isNaN(newGoal)) {
          forumathonClient.from('Forumathon_032024').insert([{ mots: newGoal }]).then(response => {
              updateProgress();
              $("#addModal").css("display", "none");
              $("#addBtn").css("display", "inline-block");
          })
          .catch(error => {
              console.error('Error adding new entry to Supabase:', error.message);
          });
        }
    });
  
    updateProgress();
    
});
