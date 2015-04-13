import java.io.*;

public class TestAppend {
  public static String[] filenames = {
    "instructorFeedbackResultsPageOpen.html",
    "instructorFeedbackResultsPageOpenWithHelperView1.html",
    "instructorFeedbackResultsPageOpenWithHelperView2.html",
    "instructorFeedbackResultsSortRecipientQuestionGiver.html",
    "instructorFeedbackResultsSortRecipientQuestionGiverTeam.html",
    "instructorFeedbackResultsSortQuestion.html",
    "instructorFeedbackResultsAjaxByQuestion.html",
    "instructorFeedbackResultsAjaxByQuestionHelperView.html",
    "instructorFeedbackResultsAjaxByRQG.html",
    "instructorFeedbackResultsFilteredBySectionA.html",
    "instructorFeedbackResultsFilteredBySectionB.html",
    "instructorFeedbackResultsSortQuestionSearch.html"
  };
  
  public static String questionHTML = "<input name=\"moderatedquestion\" type=\"hidden\" value=\"{*}\"/>";
  
  public static void main(String[] args) throws IOException {
    for (int i = 0; i < 12; i++) {
      BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("pages/" + filenames[i])));
      BufferedWriter bw = new BufferedWriter(new FileWriter("newjava/" + filenames[i]));
      String line = br.readLine();
      while (line != null) {
        if (line.contains("moderatedstudent")) {
          // For proper indentation
          int spacesandtabs = line.indexOf("<");
          int tabs = line.length() - line.replace("\t", "").length();
          for (int j = 0; j < spacesandtabs - tabs; j++) {
            bw.write(' ');
          }
          for (int j = 0; j < tabs; j++) {
            bw.write("  ");
          }
          // Actually write to files
          bw.write(questionHTML);
          bw.newLine();
        }
        bw.write(line);
        bw.newLine();
        line = br.readLine();
      }
      br.close();
      bw.close();
    }
  }
}