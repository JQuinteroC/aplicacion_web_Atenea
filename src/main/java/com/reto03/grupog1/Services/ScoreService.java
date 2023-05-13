package com.reto03.grupog1.Services;

import com.reto03.grupog1.Entities.Score;
import com.reto03.grupog1.Repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepositor;

    public List<Score> getAll() {
        return (List<Score>) scoreRepositor.getAll();
    }

    public Score addScore(Score score) {
        boolean bgrabar = true;

        if (score.getMessageText() == null)
            bgrabar = false;
        if (score.getReservation().getIdReservation() == null)
            bgrabar = false;
        if (score.getStars() == null)
            bgrabar = false;

        if (bgrabar)
            return scoreRepositor.addScore(score);
        else
            return score;
    }

    public Score updateScore(Score score) {
        boolean bGrabar = true;

        if (score.getIdScore() == null || score.getIdScore() == 0)
            bGrabar = false;

        if (bGrabar)
            return scoreRepositor.updateScore(score);
        else
            return score;
    }

    public void delScore(Integer idScore) {
        scoreRepositor.delScore(idScore);
    }

    public Score getScore(Integer idScore) {
        return scoreRepositor.getScore(idScore);
    }
}
