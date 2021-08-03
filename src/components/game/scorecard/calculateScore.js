// go through frameScores array and calculate the total for each individual frame
export const calculateFrameTotals = (scoresArray) => {
  // frame 10
  const tenthFrameIndex = 9;
  const firstScore = scoresArray[tenthFrameIndex].firstScore;
  const secondScore = scoresArray[tenthFrameIndex].secondScore;
  const thirdScore = scoresArray[tenthFrameIndex].thirdScore;
  let frameScore = 0;

  if (firstScore === "STRIKE") {
    frameScore = 10;
    if (secondScore === "STRIKE") {
      frameScore += 10;
      if (thirdScore === "STRIKE") {
        frameScore += 10;
      } else {
        frameScore += thirdScore;
      }
    } else {
      if (thirdScore === "SPARE") {
        frameScore += 10;
      } else {
        frameScore += secondScore + thirdScore;
      }
    }
  } else {
    if (secondScore) {
      // first score was NOT a strike, check for spare
      if (secondScore === "SPARE") {
        frameScore = 10 + thirdScore;
      } else {
        // opened the tenth frame
        frameScore = firstScore + secondScore;
      }
    } else {
      // only the first shot has been scored
      frameScore = firstScore;
    }
  }
  scoresArray[tenthFrameIndex] = {
    firstScore,
    secondScore,
    thirdScore,
    frameScore,
  };

  // frames 1-8
  for (var i = 8; i >= 0; --i) {
    const firstScore = scoresArray[i].firstScore;
    const secondScore = scoresArray[i].secondScore;
    let frameScore = 0;

    // a strike earns 10 points plus the sum of your next two shots
    if (firstScore === "STRIKE") {
      frameScore = 10;
      // if the next shot was a strike...
      if (scoresArray[i + 1].firstScore === "STRIKE") {
        // base score is now 20
        frameScore += 10;

        // if this is the 9th frame, get the second score from frame 10
        if (i === 8) {
          if (scoresArray[i + 1].secondScore === "STRIKE") {
            // frame score is now (capped) at 30
            frameScore += 10;
          } else {
            frameScore += scoresArray[i + 1].secondScore;
          }
        } else {
          // otherwise get the first score from the frame after next
          if (scoresArray[i + 2].firstScore === "STRIKE") {
            frameScore = 30;
          } else {
            frameScore += scoresArray[i + 2].firstScore;
          }
        }
      } else {
        // if the next shot was not a strike...
        if (scoresArray[i + 1].secondScore === "SPARE") {
          frameScore = 20;
        } else {
          // if this is the 9th frame, get the first and second shot scores
          if (i === 8) {
            frameScore +=
              scoresArray[i + 1].firstScore + scoresArray[i + 1].secondScore;
          } else {
            frameScore += scoresArray[i + 1].frameScore;
          }
        }
      }
    } else {
      if (secondScore) {
        // a spare earns 10 points plus the sum of your next one shot
        if (secondScore === "SPARE") {
          // if the next shot is a strike, total frame score is 20
          if (scoresArray[i + 1].firstScore === "STRIKE") {
            frameScore = 20;
          } else {
            frameScore = 10 + scoresArray[i + 1].firstScore;
          }
        } else {
          frameScore = firstScore + secondScore;
        }
      } else {
        frameScore = firstScore;
      }
    }
    scoresArray[i] = { firstScore, secondScore, frameScore };
  }

  return scoresArray;
};
