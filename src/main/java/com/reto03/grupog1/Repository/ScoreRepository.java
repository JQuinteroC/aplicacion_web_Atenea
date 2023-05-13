package com.reto03.grupog1.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog1.CrudRepository.ScoreCrudRepository;
import com.reto03.grupog1.Entities.Reservation;
import com.reto03.grupog1.Entities.Score;

import java.util.List;

@Repository
public class ScoreRepository {
    @Autowired
    private ScoreCrudRepository scoreCrudRepository;

    public List<Score> getAll() {
        return (List<Score>) scoreCrudRepository.findAll();
    }

    public Score getScore(Integer idScore) {
        return scoreCrudRepository.findById(idScore).orElse(null);
    }

    public Score addScore(Score score) {
        if (score.getIdScore() == null || score.getIdScore() == 0) {
            return scoreCrudRepository.save(score);
        } else {
            return score;
        }
    }

    public Score updateScore(Score score) {
        Reservation reservation = new Reservation();

        Score objScore = getScore(score.getIdScore());
        if (objScore == null) {
            return score;
        }

        if (score.getMessageText() != null)
            objScore.setMessageText(score.getMessageText());

        if (score.getStars() != null)
            objScore.setStars(score.getStars());

        if (score.getReservation().getIdReservation() != null) {
            reservation.setIdReservation(score.getReservation().getIdReservation());
            score.setReservation(reservation);
        }

        return scoreCrudRepository.save(objScore);
    }

    public void delScore(Integer idScore) {
        scoreCrudRepository.deleteById(idScore);
    }
}
