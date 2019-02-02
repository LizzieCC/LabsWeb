(define (fol x)

(if (even? (length x))
  (car x)
  (car (reverse x))
  )
)
(fol '(1 2 3 4 5))



(define (third x)

(if (> (length x) 2)
  (list-ref x 2)
  '()
  )
)

(third '(1 2 3 4 5 6))


(define (list x y z)

  (cons x (cons y (cons z '())))
)

(list 1 2 3)