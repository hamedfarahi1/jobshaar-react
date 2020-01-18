package ir.khu.jaobshaar.component.company;

import ir.khu.jaobshaar.entity.model.Company;
import ir.khu.jaobshaar.entity.model.Company_;
import ir.khu.jaobshaar.service.criteria.CompanyCriteria;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Component
public class CompanyFiltering {
    @PersistenceContext
    private final EntityManager entityManager;

    public CompanyFiltering(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Company> filter(CompanyCriteria companyCriteria) {

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Company> cq = cb.createQuery(Company.class);
        Root<Company> root = cq.from(Company.class);
        List<Predicate> predicates = new ArrayList<>();

        if (companyCriteria.getAddress() != null) {
            predicates.add(cb.like(root.get(Company_.ADDRESS), "%" + companyCriteria.getAddress().getContains() + "%"));
        }
        if (companyCriteria.getBio() != null) {
            predicates.add(cb.like(root.get(Company_.BIO), "%" + companyCriteria.getBio().getContains() + "%"));
        }
        if (companyCriteria.getCategoryTypeIndex() != null) {
            if (companyCriteria.getCategoryTypeIndex().getIn() != null)
                predicates.add(cb.in(root.get(Company_.CATEGORY_TYPE_INDEX)).value(companyCriteria.getCategoryTypeIndex().getIn()));

            if (companyCriteria.getCategoryTypeIndex().getEquals() != null)
                predicates.add(cb.equal(root.get(Company_.CATEGORY_TYPE_INDEX), companyCriteria.getCategoryTypeIndex().getEquals()));
        }
        if (companyCriteria.getName() != null) {
            predicates.add(cb.like(root.get(Company_.NAME), "%" + companyCriteria.getName().getContains() + "%"));
        }
        return entityManager.createQuery(cq.select(root).where(predicates.toArray(new Predicate[predicates.size()]))).getResultList();
    }

}
